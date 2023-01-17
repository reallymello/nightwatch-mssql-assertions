# nightwatch-mssql-assertions

[![Node.js Test](https://github.com/reallymello/nightwatch-mssql-assertions/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/reallymello/nightwatch-mssql-assertions/actions/workflows/node.js.yml)

Custom Nightwatch.js assertions for writing tests against mssql databases

## Why write tests against the database during testing?

When running NightwatchJS or browser-based selenium tests it can be useful to verify that actions done by the user or your automation on the front end correctly update the backend. This assertion library allows you to connect to an MSSQL database and write tests or checks against the database tables.

[Full database testing tutorial using nightwatch-mssql-assertions](https://www.davidmello.com/database-testing-with-nightwatchjs/)

## Installation instructions

In your Nightwatch test project

> npm install nightwatch-mssql-assertions --save

In your Nightwatch.js nightwatch.json configuration add or append this entry

> "plugins": ["nightwatch-mssql-assertions"]

Or, if you are using a Nightwatch version older than 2.0 that doesn't use the plugin pattern use this entry instead

> "custom_assertions_path": ["./node_modules/nightwatch-mssql-assertions/nightwatch/assertions"]

The package looks for the database configuration inside the test_settings section of the nightwatch.json file. Add a globals section if it doesn't already exist inside one of your nested test_settings such as default for example.

```json
"test_settings": {
        "default": {
            "desiredCapabilities": {
                "browserName": "chrome"
            },
            "globals": {
                "dbUsername": "sa",
                "dbPassword": "theDatabasePasswordGoesHere",
                "dbAddress": "localhost",
                "dbPort": 1433,
                "dbName": "nightwatchDb"
            }
        }
    }
```

### Specific config passing

In the 2.x versions I've added the ability to _optionally_ pass the entire database configuration object for more flexibility and more advanced multi-environment test configurations and globals files.

_If the configuration object is not passed in as a third parameter in the command it will default to use the above example_

For example you could read the config out of globals.js for a specific staging environment database configuration.

```js
'Verify only one John Doe': function (browser) {
        browser
            .assert
            .recordCountIs(1, "people", "first_name = 'John' AND last_name = 'Doe'",
            browser.globals.env.staging.sql.userDb);
    },
```

globals.js could look like this where you could have entries for staging and other environments or perhaps multiple different databases within the sql collection.

```js
env: {
    staging: {
        sql: {
            userDb: {
                user: "usernameHere",
                password: "something secure",
                server: "server123.myco.org",
                port: 1433,
                database: "users",
                encrypt: true,
                options: {
                    enableArithAbort: true,
                    encrypt: true,
                    trustServerCertificate: true // useful for self-signed certs in test environments
                }
            }
        }
    }
}
```

## Writing Nightwatch tests with SQL assertions

This first publish adds the **.recordCountIs(\***expectedCount, tableName, whereClause--or null to return count of entire table**\*)** assertion which allows you to verify a specified row/record count against a WHERE clause you specify.

Example:

```js
module.exports = {
  "Database count test": function (browser) {
    browser.assert.recordCountIs(
      1,
      "tableNameHere",
      "myColumn = 'what I want'"
    );
  },
};
```

```sh
√ Testing if the record count (first_name = 'John' AND last_name = 'Wick') equals 0 (99ms)
√ Testing if the record count (first_name = 'John' AND last_name = 'Wick') equals 3 (103ms)
```
