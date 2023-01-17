module.exports = {
  test: async () => {
    const sql = require('mssql');

    const config = {
      user: this.api.globals.dbUsername,
      password: this.api.globals.dbPassword,
      database: this.api.globals.dbName,
      server: this.api.globals.dbAddress,
      port: this.api.globals.dbPort,
      encrypt: true,
      options: {
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    };
    try {
      await sql.connect(config);
      const result = await sql.query`select * from mytable`;
      console.dir(result);
    } catch (err) {
      console.error(err);
    }

    /*browser.assert.recordCountIs(
      1,
      'people',
      "first_name = 'Jane' AND last_name = 'Doe'"
    );*/
  },
};
