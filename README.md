# SQL Tabs

Rich SQL client. Home [www.sqltabs.com](http://www.sqltabs.com)

Supported databases:

    - Postgresql
    - MySQL / MariaDB
    - MS SQL
    - Amazon Redshift
    - AlaSQL

Supported Platforms:

    - Mac
    - Windows
    - Linux

## Building


In order to run SQL Tabs from source code follow the next steps:
(In case of any issues please report them [here](https://github.com/sasha-alias/sqltabs/issues/39))

__node.js not higher than v10 is required__

1. Install [npm](https://www.npmjs.com) - a javascript package manager

2. Get the code, install dependencies and build the application:

        git clone https://github.com/sasha-alias/sqltabs
        cd sqltabs
        npm install


3. Run the application:

        npm start


Contribution and issues reports are very appreciated.


### Platform specific things

You might want to rebuild grpc for firebase driver to work:

        npm rebuild grpc --runtime=electron --target=4.1.0 --target_archx64


