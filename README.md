# Dog Breed Voting App: Back-End

![Screenshot 2021-12-17 at 9 17 55](https://user-images.githubusercontent.com/66834619/146512331-a16080e0-e3a2-4203-b42d-26227d9b83b4.png)

- [Deployed API](https://dog-breed-voting-app.herokuapp.com/)
- [Project Documentation](https://www.notion.so/weareacademy/Documentation-e62fbd29aa124bd2a69214809331f2d8)
- [Front-End Github Repository](https://github.com/nchumphot/dog-breed-voting-app-frontend)

## Install

`yarn`

## DB Setup

Copy .env.example to .env and set `DATABASE_URL` and `PORT` to your liking.

Example for a local database: `DATABASE_URL=postgres://academy@localhost/dogbreedDB`

You will need to create your own databases for this project - one locally and one on Heroku.

## Create and Populate Database

### SQL Query to Create Table
The `createTables.sql` file provides the queries used to create the tables for this project.

### Populate Tables
`ts-node db/initialiseTable.ts`

This will populate your database depending on the dbConfig provided:
  - Locally: `const dbConfig = {
              connectionString: process.env.DATABASE_URL,
              ssl: false,
            };`
  - Heroku: `const dbConfig = {
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false },
            };`
  
## Running API

### Running locally

`yarn start:dev`

This will set the env var LOCAL to true, which will cause the db connection configuration to NOT use SSL (appropriate for your local db)

### Running on heroku

When the project is deployed to heroku, the command in your `Procfile` file will be run.
