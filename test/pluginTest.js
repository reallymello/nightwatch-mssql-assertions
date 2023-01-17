module.exports = {
  test: async () => {
    const sql = require('mssql');

    try {
      await sql.connect(
        'Server=localhost,1433;Database=database;User Id=sa;Password=ThisIsAStrongP@assword!SortOf;Encrypt=true'
      );
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
