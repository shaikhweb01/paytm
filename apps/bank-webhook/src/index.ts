import { Pool } from 'pg';
import express from 'express'
const app=express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.post("/hdfcWebhook", async (req, res) => {
  // ... validation code ...

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Check existing transaction
    const txnResult = await client.query(
      'SELECT * FROM "OnRampTransaction" WHERE token = $1',
      [token]
    );
    
    if (txnResult.rows.length === 0 || txnResult.rows[0].status === 'Success') {
      await client.query('ROLLBACK');
      return res.status(200).json({ message: "Already processed" });
    }
    
    // Update balance
    await client.query(
      'UPDATE "Balance" SET amount = amount + $1 WHERE "userId" = $2',
      [amount, userId]
    );
    
    if (client.rowCount === 0) {
      throw new Error('User balance not found');
    }
    
    // Mark transaction success
    await client.query(
      'UPDATE "OnRampTransaction" SET status = $1 WHERE token = $2',
      ['Success', token]
    );
    
    await client.query('COMMIT');
    res.status(200).json({ message: "Captured" });
  } catch (e) {
    await client.query('ROLLBACK');
    console.error("Webhook error:", e);
    res.status(500).json({
      message: "Error while processing webhook",
    });
  } finally {
    client.release();
  }
});
app.listen(3003);