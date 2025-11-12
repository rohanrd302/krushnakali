
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import pool from './db';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let client;
  try {
    client = await pool.connect();
    const devotee = JSON.parse(event.body || '{}');
    const { name, email, mobile, birthDate } = devotee;

    if (!name || !email || !mobile || !birthDate) {
        return { statusCode: 400, body: 'Missing required fields.' };
    }
    
    const id = `dev_${new Date().getTime()}`;
    const registrationDate = new Date().toISOString();

    const query = `
      INSERT INTO devotees (id, name, email, mobile, birth_date, registration_date)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [id, name, email, mobile, birthDate, registrationDate];
    await client.query(query, values);

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Devotee added successfully', id }),
    };
  } catch (error) {
    console.error('Error adding devotee:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add devotee.' }),
    };
  } finally {
      if(client) {
        client.release();
      }
  }
};

export { handler };