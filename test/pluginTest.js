module.exports = {
  before: async () => {
    const sql = require('mssql');
    const config = {
      user: browser.globals.dbUsername,
      password: browser.globals.dbPassword,
      database: browser.globals.dbName,
      server: browser.globals.dbAddress,
      port: browser.globals.dbPort,
      encrypt: true,
      options: {
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    };

    const table = new sql.Table('people');
    table.create = true;
    table.columns.add('person_id', sql.Int, { nullable: false });
    table.columns.add('first_name', sql.VarChar(200), { nullable: false });
    table.columns.add('last_name', sql.VarChar(200), { nullable: false });
    table.rows.add(1, 'John', 'Doe');
    table.rows.add(2, 'Jane', 'Doe');
    table.rows.add(3, 'Really', 'Mello');

    const pool = new sql.ConnectionPool(config);
    pool.connect((err) => {
      if (err) {
        console.error('On pool.connect received error: ' + err);
      } else {
        const request = new sql.Request(pool);
        request.bulk(table, (err, result) => {
          if (err) {
            console.error('On request.bulk received error: ' + err);
          } else {
            console.info(result);
            pool.close();
          }
        });
      }
    });
  },
  'Can match 1 record': async (browser) => {
    browser.assert.recordCountIs(
      1,
      'people',
      "first_name = 'Jane' AND last_name = 'Doe'"
    );
  },
  'Will pass 0 records': async (browser) => {
    browser.assert.recordCountIs(0, 'people', "first_name = 'Jacob'");
  },
};
