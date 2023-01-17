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
    try {
      await sql.connect(config);
      const result = await sql.query`SELECT GETDATE();`;
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
