import pg from "pg";

export const pool = new pg.Pool({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "nico1901",
  database: "tasksDB"
});

pool.on("connect", () => {
  console.log("Database conectada");
});
