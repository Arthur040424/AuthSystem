require("dotenv").config();

const express = require("express");
const pool = require("./db")
const app = express();
const PORT = 3000;
const authRoutes = require("./routes/auth")

// BUILT IN MIDDLEWARE TO PARSE JSON REQUEST BODIES
app.use(express.json());

// CUSTOM MIDDLEWARE FOR REQUEST LOGGING
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // pass control to the next function
});

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/about", (req, res) => {
  res.send("This is the About page.");
});

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ])
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke!"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
