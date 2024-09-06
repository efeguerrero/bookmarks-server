import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const { HOST, PORT, DATABASE, USER, PASSWORD } = process.env;

const config = {
  host: HOST,
  port: PORT,
  database: DATABASE,
  user: USER,
  password: PASSWORD,
};

const sql = postgres(config);

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result[0]);
}
getPgVersion();

export { sql };
