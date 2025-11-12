
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import pool from './db';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const newSettings = JSON.parse(event.body || '{}');

    const client = await pool.connect();
    const query = 'UPDATE settings SET config = $1 WHERE id = 1';
    await client.query(query, [newSettings]);
    client.release();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Settings updated successfully." }),
    };
  } catch (error) {
    console.error('Error updating settings:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to update settings." }),
    };
  }
};

export { handler };
