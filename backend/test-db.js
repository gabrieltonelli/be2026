const { Client } = require('pg');
require('dotenv').config({ path: 'c:/Users/gabrielt/OneDrive - Don Yeyo S.A/Documentos/Proyectos/be/backend/.env' });

async function testConnection() {
    console.log('Testing connection to Supabase...');
    console.log('Host:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USERNAME);
    console.log('Port:', process.env.DB_PORT);

    const client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log('Success! Connected to database.');
        const res = await client.query('SELECT NOW()');
        console.log('Server time:', res.rows[0].now);
        await client.end();
    } catch (err) {
        console.error('Connection failed:', err.message);
        console.error(err);
    }
}

testConnection();
