import pkg from "pg";
import { config } from "dotenv";
const {Client} = pkg

config({ path: "./config/config.env" });

// const database = new Client({
//     user: process.env.DB_USER || process.env.USER || "postgres",
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD || "12345678",
//     port: process.env.DB_PORT
// })

const database = new Client({
  user: "postgres",
  host: "localhost",
  database: "mern_ecommerce_store",
  password: "12345678",
  port: 5432,
});

try{
    await database.connect();
    console.log("Connected to database sucessfully");
}
catch(error){
    console.error("Database connection failed",error);
    process.exit(1);
}

export default database;