const { Client } = require('pg');

const client = new Client({
  host: 'nozomi.proxy.rlwy.net',
  port: 10035,
  user: 'postgres',
  password: 'rGpSPEgqRlfkItsMphBdsbPEWCqvJYLH',
  database: 'railway',
});

async function checkDatabase() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Check tables
    const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables:', tables.rows);
    
    // Check user table structure
    const userTable = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'user'");
    console.log('User table columns:', userTable.rows);
    
    await client.end();
  } catch (err) {
    console.error('Database error:', err);
  }
}

checkDatabase();