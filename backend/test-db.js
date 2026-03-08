const { Client } = require('pg');
<<<<<<< HEAD
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
=======
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
>>>>>>> ad6b59dfdc7ba34b97e53c349b33211a7d8e2693
