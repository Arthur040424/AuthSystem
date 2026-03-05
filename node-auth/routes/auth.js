const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// POST /auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  //1. VAlidate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters."});
  }

  try {
    // 2. Check if user already exists
    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered."});
    }

    // 3. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    //4. Save user to database
    const newUSer = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at", [email, hashedPassword]);

    res.status(201).json({
      message: "User Registered Successfully!",
      user: newUSer.rows[0],
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// POST auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    //2. Find the user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password. "});
    }

    const user = result.rows[0];

    // 3. Compare the password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    //4. Create a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1h" } // token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful!",
      token,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// GET /auth/profile (protected)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // req.user was set by authMiddleware - use it to fetch fresh data from DB
    const result = await pool.query(
      "SELECT id, email, created_At FROM users WHERE id = $1",
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ user: result.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error." });
  }
});
    
module.exports = router;