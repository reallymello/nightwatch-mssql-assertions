export * from 'nightwatch';

declare module 'nightwatch' {
  export interface NightwatchCustomAssertions {
    /**
     *
     * @param expectedCount Expected row count of where clause query result
     * @param table Name of the table to execute query against
     * @param whereClause Portion of the query after WHERE keyword e.g. "UnitCost > 3.99"
     * @param dbConfig Database configuration object, can be passed in or read out of Nightwatch globals if saved under dbUsername, dbPassword, dbAddress, dbPort, dbName
     * @returns NightwatchAssertionsResult
     */
    recordCountIs: (
      expectedCount: number,
      table: string,
      whereClause: string,
      dbConfig?: {
        user: string;
        password: string;
        server: string;
        port: number;
        database: string;
        encrypt: boolean;
        options: {
          enableArithAbort: boolean;
          trustServerCertificate: boolean;
        };
      }
    ) => Awaitable<NightwatchAPI, NightwatchAssertionsResult<string>>;
  }
  export interface NightwatchCustomCommands {
    /**
     * Returns data from your SQL table query as a key/value pair object
     * @param query The SQL SELECT statement to return data with
     * @param dbConfig Database configuration object, can be passed in or read out of Nightwatch globals if saved under dbUsername, dbPassword, dbAddress, dbPort, dbName
     * @returns An object containing key value pairs keyed to the names of the columns in your query. e.g. { first_name: 'John' }
     */
    getSqlValue: (
      query: string,
      dbConfig?: {
        user: string;
        password: string;
        database: string;
        server: string;
        port: number;
        encrypt?: boolean;
        options?: {
          enableArithAbort?: boolean;
          trustServerCertificate?: boolean;
        };
      }
    ) => Awaitable<NightwatchAPI, { [key: string]: any }>;
    /**
     * Will run a SQL query against the given database
     * @param query A valid SQL statement
     * @param dbConfig Database configuration object, can be passed in or read out of Nightwatch globals if saved under dbUsername, dbPassword, dbAddress, dbPort, dbName
     * @returns The mssql response object
     */
    runSql: (
      query: string,
      dbConfig?: {
        user: string;
        password: string;
        database: string;
        server: string;
        port: number;
        encrypt?: boolean;
        options?: {
          enableArithAbort?: boolean;
          trustServerCertificate?: boolean;
        };
      }
    ) => Awaitable<NightwatchAPI, { [key: string]: any }>;
  }
}
