module.exports = class GetSqlValue {
  async command(query, dbConfig) {
    const sql = require('mssql');
    let returnValue;

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

    sql
      .connect(config)
      .then(() => {
        return sql.query(query);
      })
      .then((result) => {
        sql.close();

        returnValue = result.recordset[0][''];
      })
      .catch((err) => {
        console.error(err);
        sql.close();
        returnValue = {
          status: -1,
          error: err.message,
        };
      });

    return returnValue;
  }
};
