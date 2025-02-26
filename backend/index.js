const express = require('express');
const db = require('./db'); // Import the database connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const openAI = require("openai");
const cookieParser = require('cookie-parser');
const verifyToken = require('./authMiddleware');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser()); // Parses cookies
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


const client = new openAI.OpenAI({ apiKey: process.env.GPT_API_KEY});


app.get('/motivate/:mood', verifyToken, async (req, res) => {
    const { mood } = req.params;
    try {
        const completions = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
              role: "user",
              content: "write a very short poem based on my mood\nmy mood is " + mood
            }]
        });

        res.status(200).json(completions);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e});
    }
})

app.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;


        const [rows] = await db.query('SELECT * FROM users2 WHERE email= ?', [email]);
        
        if (rows.length == 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // Compare password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Database error');
    }
});

app.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password, about, bigDream, inspiration, obstacles, fears, regrets } = req.body;

    try {
        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM users2 WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const [result] = await db.query(
            'INSERT INTO users2 (firstname, lastname, email, password, about, bigDream, inspiration, obstacles, fears, regrets) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [firstname, lastname, email, hashedPassword, about, bigDream, inspiration, obstacles, fears, regrets]
        );

        // Generate JWT Token
        const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
