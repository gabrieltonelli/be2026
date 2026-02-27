const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

console.log('Connecting to:', process.env.DB_HOST);
console.log('User:', process.env.DB_USERNAME);
// No imprimimos el password por seguridad, pero validamos si existe
console.log('Password exists:', !!process.env.DB_PASSWORD);

client.connect()
    .then(() => {
        console.log('Successfully connected to Supabase PostgreSQL!');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('Current time from DB:', res.rows[0]);
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error details:', err);
        process.exit(1);
    });
