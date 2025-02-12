import pg from 'pg';

// Create a new PostgreSQL client with your provided details
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  password: 'xmkms@123',
  port: 5432,
});

async function createDatabase() {
  try {
    // Connect to the PostgreSQL server
    await db.connect();

    // Create the 'authena' database
    await db.query('CREATE DATABASE authena');

    console.log('Database "authena" created successfully');
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    // End the client connection
    await db.end();
  }
}

// Call the function to create the database
createDatabase();
