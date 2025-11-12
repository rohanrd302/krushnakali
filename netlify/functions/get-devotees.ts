
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import pool from './db';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM devotees ORDER BY registration_date DESC');
    client.release();

    // FIX: Map snake_case database columns to camelCase properties to match frontend types.
    const devotees = result.rows.map(d => ({
        id: d.id,
        name: d.name,
        email: d.email,
        mobile: d.mobile,
        birthDate: d.birth_date,
        registrationDate: d.registration_date,
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(devotees),
    };
  } catch (error) {
    console.error('Error fetching devotees:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch devotees." }),
    };
  }
};

export { handler };