require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");

const app = express();
const port = 6000

app.use(cors());
app.use(express.json());

// ✅ No deprecated options
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("testDB");
    const usersCollection = db.collection("users");

    // ✅ Register
    app.post("/api/v1/register", async (req, res) => {
      const { username, email, password } = req.body;

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists!",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
        role: "user",
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    });

    // ✅ Login
    app.post("/api/v1/login", async (req, res) => {
      const { email, password } = req.body;

      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES_IN }
      );

      res.json({
        success: true,
        accessToken: token,
      });
    });

    // Test route
    app.get("/", (req, res) => {
      res.json({ message: "Server is running" });
    });

    // ✅ Start server AFTER DB is ready
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error(err);
  }
}

run();
