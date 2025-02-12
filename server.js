import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "authena",
  password: "xmkms@123",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); 

// Route to display login form
app.get("/", (req, res) => {
  res.render("login2.ejs");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
      // Store the username in a variable
    
  
    const query = "SELECT * FROM login WHERE username = $1 AND password = $2";
    
    db.query(query, [username, password], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Database error");
      } else {
        if (result.rows.length > 0) {
          // If a matching user is found, store the id in the ud variable
          
          
          // You can now use the ud variable to pass to the dashboard or for further processing
          res.render('dashboard', {
            user: {
                name: "Alex Johnson",
                photoUrl: "/images/user.jpg",
                compatibility: 75
            },
            matches: [
                { name: "Sam Taylor", photo: "/images/match1.jpg", compatibility: 82 },
                // ... more matches
            ]
        });
          // Optionally pass the userId to the dashboard
        } else {
          res.send("Invalid username or password");
        }
      }
    });
  });
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });