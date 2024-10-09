import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

// const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
const { DATABASE_URL } = process.env;

// const config = {
//   host: DB_HOST,
//   port: DB_PORT,
//   database: DB_DATABASE,
//   user: DB_USER,
//   password: DB_PASSWORD,
// };

const sql = postgres(DATABASE_URL);

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result[0]);
}
getPgVersion();

export default sql;
