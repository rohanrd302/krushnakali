
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import pool from './db';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT config FROM settings WHERE id = 1');

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Settings not found." }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.rows[0]),
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch settings." }),
    };
  } finally {
      if (client) {
        client.release();
      }
  }
};

export { handler };