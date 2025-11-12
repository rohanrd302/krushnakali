
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import pool from './db';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT * FROM donors ORDER BY date DESC');
    
    // FIX: Map snake_case database columns to camelCase properties to match frontend types.
    const donors = result.rows.map(donor => ({
        id: donor.id,
        amount: parseFloat(donor.amount),
        fullName: donor.full_name,
        email: donor.email,
        mobile: donor.mobile,
        address1: donor.address1,
        address2: donor.address2,
        city: donor.city,
        state: donor.state,
        pincode: donor.pincode,
        status: donor.status,
        date: donor.date,
        paymentId: donor.payment_id,
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donors),
    };
  } catch (error) {
    console.error('Error fetching donors:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch donors." }),
    };
  } finally {
    if (client) {
        client.release();
    }
  }
};

export { handler };