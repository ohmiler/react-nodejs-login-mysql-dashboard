const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "react_db",
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
    }
});

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello World from server',
    })
})

app.post("/register", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
  
      if (rows.length === 0) {
        const hash = await bcrypt.hash(password, saltRounds);
  
        await db.promise().query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);
  
        res.status(201).json({
          msg: "User registered successfully!",
        });
      } else {
        res.status(409).json({
          msg: "Email is already taken!",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });

  app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: err });
        }

        if (result.length > 0) {
            const hashedPassword = result[0].password;

            bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ msg: err });
                }

                if (isMatch) {
                    // You might want to generate a token here or send user details
                    return res.json({
                        msg: "Login successful!",
                        // Include any relevant user details or token here
                    });
                } else {
                    return res.status(401).json({ 
                        msg: "Incorrect email or password"
                    });
                }
            });
        } else {
            return res.status(401).json({ msg: "Unregistered user!" });
        }
    });
});

app.post('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during logout' });
      }
      
      // Clear localStorage on the client side
      res.json({ message: 'Logout successful', clearLocalStorage: true });
    });
});

app.listen(3001, () => {
    console.log("Hello World from Server");
});