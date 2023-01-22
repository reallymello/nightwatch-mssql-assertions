module.exports = class RunSql {
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

    let returnValue;
    try {
      await sql.connect(config);
      returnValue = await sql.query(query);
    } catch (err) {
      console.error(
        `There was an error executing the SQL command, received: ${err}`
      );
      returnValue = {
        status: -1,
        error: err.message,
      };
    } finally {
      sql.close();
    }

    return returnValue;
  }
};
