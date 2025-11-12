import { Pool } from 'pg';

let pool;

if (!pool) {
  pool = new Pool({
    // The connection string from the DATABASE_URL environment variable
    // contains all necessary connection details, including SSL settings (sslmode=require).
    // The 'pg' library automatically parses this string.
    connectionString: process.env.DATABASE_URL,
  });
}

export default pool;
