module.exports = {
  test: async (browser) => {
    const sql = require('mssql');
    const config = {
      user: browser.globals.dbUsername,
      password: browser.globals.dbPassword,
      database: 'master', //browser.globals.dbName,
      server: browser.globals.dbAddress,
      port: browser.globals.dbPort,
      encrypt: true,
      options: {
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    };
    console.log(config);
    try {
      await sql.connect(config);
      //const result = await sql.query`SELECT GETDATE();`;
      const result = await sql.query(
        `CREATE DATABASE nightwatchDb;

        GO
        USE nightwatchDb
        CREATE TABLE people(
            person_id INT PRIMARY KEY IDENTITY,
            first_name VARCHAR(200),
            last_name VARCHAR(200)
        );
        
        GO
        
        INSERT INTO 
            dbo.people(first_name, last_name)
        VALUES
            ('John', 'Doe'),
            ('Jane', 'Doe'),
            ('Really', 'Mello');
            
        GO`
      );
      console.dir(result);
    } catch (err) {
      console.error(err);
    }

    browser.assert.recordCountIs(
      1,
      'people',
      "first_name = 'Jane' AND last_name = 'Doe'"
    );
  },
};
