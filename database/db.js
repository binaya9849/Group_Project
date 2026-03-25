import pkg from "pg";
const {Client} = pkg

const database = new Client({
    user: "postgres",
    host: process.env.DB_Host,
    database: process.env.DB_NAME,
    password: "12345678",
    port: process.env.DB_PORT
})

try{
    await database.connect();
    console.log("Connected to database sucessfully");
}
catch(error){
    console.error("Database connection failed",error);
    process.exit(1);
}

export default database;