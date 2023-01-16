export * from '@types/nightwatch';

declare module 'nightwatch' {
  export interface NightwatchCustomAssertions {
    /**
     *
     * @param expectedCount Expected row count of where clause query result
     * @param table Name of the table to execute query against
     * @param whereClause Portion of the query after WHERE keyword e.g. "UnitCost > 3.99"
     * @param dbConfig Database configuration object, can be passed in or read out of Nightwatch globals if saved under "dbConfig"
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
}
