const { Client } = require('pg');

const client = new Client({
  host: 'nozomi.proxy.rlwy.net',
  port: 10035,
  user: 'postgres',
  password: 'rGpSPEgqRlfkItsMphBdsbPEWCqvJYLH',
  database: 'railway',
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to the database');
    await client.end();
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

testConnection();