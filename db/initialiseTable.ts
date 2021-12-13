const data = require("./data.json");
const { Client } = require("pg");
// const { config } = require("dotenv");
import dotenv from "dotenv";
dotenv.config();

interface IBreeds {
  [key: string]: string[];
}

const uniqueBreedArr: { breed: string; subBreed: string }[] = [];
const breeds: IBreeds = data.message;
for (const [breed, subBreeds] of Object.entries(breeds)) {
  if (subBreeds.length === 0) {
    uniqueBreedArr.push({
      breed: breed,
      subBreed: null,
    });
  } else {
    for (const subBreed of subBreeds) {
      uniqueBreedArr.push({
        breed: breed,
        subBreed: subBreed,
      });
    }
  }
}

async function initialiseTable() {
  const herokuSSLSetting = { rejectUnauthorized: false };
  //   const sslSetting = process.env.LOCAL ? false : herokuSSLSetting;
  const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: herokuSSLSetting,
  };

  // All the breed names
  const breedArr = Object.keys(data.message);

  const client = new Client(dbConfig);
  await client.connect();

  breedArr.map(async (breed) => {
    await client.query("INSERT INTO breed (name) VALUES ($1);", [breed]);
  });

  uniqueBreedArr.map(async (item) => {
    const idRes = await client.query("SELECT id FROM breed WHERE name = ($1)", [
      item.breed,
    ]);
    const id = idRes.rows[0].id;

    if (item.subBreed === null) {
      await client.query("INSERT INTO dog (breed_id) VALUES ($1);", [id]);
    } else {
      await client.query(
        "INSERT INTO dog (breed_id, subbreed_name) VALUES (($1),($2));",
        [id, item.subBreed]
      );
    }
  });

  await client.query("SELECT NOW()").then(() => client.end());
}

initialiseTable();
