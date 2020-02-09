# nightwatch-mssql-assertions
Custom Nightwatch.js assertions for writing tests against mssql databases

## Why write tests against the database during testing?

When running NightwatchJS or browser-based selenium tests it can be useful to verify that actions done by the user or your automation on the front end correctly update the backend. This assertion library allows you to connect to an MSSQL database and write tests or checks against the database tables.

## Installation instructions

In your Nightwatch test project 

> npm install nightwatch-mssql-assertions --save

In your Nightwatch.js nightwatch.json configuration add or append this entry

> "custom_assertions_path": ["./node_modules/nightwatch-mssql-assertions/src/assertions"]

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

## Writing Nightwatch tests with SQL assertions

This first publish adds the **.recordCountIs(***expectedCount, tableName, whereClause--or null to return count of entire table***)** assertion which allows you to verify a specified row/record count against a WHERE clause you specify.

Example:

```js
module.exports = {
    'Database count test': function(browser) {
        browser
            .assert
            .recordCountIs(1, "tableNameHere", "myColumn = 'what I want'");
    }
}
```

```sh
√ Testing if the record count (first_name = 'John' AND last_name = 'Wick') equals 0 (99ms)
√ Testing if the record count (first_name = 'John' AND last_name = 'Wick') equals 3 (103ms)
```
