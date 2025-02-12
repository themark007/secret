
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "authena",
  password: "xmkms@123",
  port: 5432,
});





async function createLoginTable() {
    try {
      // Connect to the PostgreSQL server
      await db.connect();
  
      // SQL query to create the 'login' table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS login (
          uid SERIAL PRIMARY KEY,  -- Auto-increment field for user ID
          username VARCHAR(100) NOT NULL,  -- Username, cannot be NULL
          password VARCHAR(100) NOT NULL,  -- Password, cannot be NULL
          phone_number VARCHAR(20) NOT NULL,  -- Phone number, cannot be NULL
          email VARCHAR(100) NOT NULL UNIQUE  -- Email, cannot be NULL and should be unique
        );
      `;
  
      // Execute the query to create the table
      await db.query(createTableQuery);
  
      console.log('Table "login" created successfully');
    } catch (err) {
      console.error('Error creating table:', err);
    } finally {
      // End the client connection
      await db.end();
    }
  }
  
  // Call the function to create the login table
  createLoginTable();