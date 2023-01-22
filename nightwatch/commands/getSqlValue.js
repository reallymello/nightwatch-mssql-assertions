module.exports = class GetSqlValue {
  async command(query, dbConfig) {
    const sql = require('mssql');

    const config = dbConfig
      ? dbConfig
      : {
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
      let result = await sql.query(query);
      return result.recordset[0][''];
    } catch (err) {
      console.error(
        `There was an error executing the SQL command, received: ${err}`
      );
      return {
        status: -1,
        error: err.message,
      };
    }
  }
};
