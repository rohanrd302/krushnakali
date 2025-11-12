
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import pool from './db';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let client;
  try {
    client = await pool.connect();
    const donor = JSON.parse(event.body || '{}');
    const { amount, fullName, email, mobile, address1, address2, city, state, pincode, status, paymentId } = donor;

     if (!amount || !fullName || !email || !mobile || !status) {
        return { statusCode: 400, body: 'Missing required fields.' };
    }

    const id = `don_${new Date().getTime()}`;
    const date = new Date().toISOString();

    const query = `
      INSERT INTO donors (id, amount, full_name, email, mobile, address1, address2, city, state, pincode, status, date, payment_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [id, amount, fullName, email, mobile, address1, address2, city, state, pincode, status, date, paymentId];
    await client.query(query, values);

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Donor added successfully', id }),
    };
  } catch (error) {
    console.error('Error adding donor:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add donor.' }),
    };
  } finally {
    if (client) {
      client.release();
    }
  }
};

export { handler };