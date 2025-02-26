const express = require('express');
const db = require('./db'); // Import the database connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const openAI = require("openai");
const cookieParser = require('cookie-parser');
const verifyToken = require('./authMiddleware');
const { z } = require('zod');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser()); // Parses cookies
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


const client = new openAI.OpenAI({ apiKey: process.env.GPT_API_KEY});

// Zod validation schemas
const loginSchema = {
  body: z.object({
    email: z.string({
        message:"Email is invalid"
    })
      .email({ message: "Invalid email format" })
      .max(255, { message: "Email must be less than 255 characters" }),
    password: z.string({
        message:"Password is invalid"
    })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password must be less than 100 characters" })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" })
  })
};

const signupSchema = {
  body: z.object({
    firstname: z.string({
        message:"First name is invalid"
    })
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s-']+$/, { message: "First name can only contain letters, spaces, hyphens and apostrophes" }),
    lastname: z.string({
        message:"Last name is invalid"
    })
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s-']+$/, { message: "Last name can only contain letters, spaces, hyphens and apostrophes" }),
    email: z.string({
        message:"Email is invalid"
    })
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" })
      .max(255, { message: "Email must be less than 255 characters" }),
    password: z.string({
        message:"Password is invalid"
    })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password must be less than 100 characters" })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" }),
    about: z.string({
        message:"About is invalid"
    })
      .max(1000, { message: "About section must be less than 1000 characters" })
      .optional(),
    bigDream: z.string({
        message:"Big dream is invalid"
    })
      .max(1000, { message: "Big dream must be less than 1000 characters" })
      .optional(),
    inspiration: z.string({
        message:"Inspiration is invalid"
    })
      .max(1000, { message: "Inspiration must be less than 1000 characters" })
      .optional(),
    obstacles: z.string({
        message:"Obstacles is invalid"
    })
      .max(1000, { message: "Obstacles must be less than 1000 characters" })
      .optional(),
    fears: z.string({
        message:"Fears is invalid"
    })
      .max(1000, { message: "Fears must be less than 1000 characters" })
      .optional(),
    regrets: z.string({
        message:"Regrets is invalid"
    })
      .max(1000, { message: "Regrets must be less than 1000 characters" })
      .optional()
  })
};

const moodSchema = {
  params: z.object({
    mood: z.string({
        message:"Mood is invalid"
    })
      .min(1, { message: "Mood parameter is required" })
      .max(100, { message: "Mood must be less than 100 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Mood can only contain letters and spaces" })
  })
};

// Validation middleware
const validateRequest = (schema) => (req, res, next) => {
  try {
    if (schema.params) {
      schema.params.parse(req.params);
    }
    
    if (schema.body) {
      schema.body.parse(req.body);
    }
    
    if (schema.query) {
      schema.query.parse(req.query);
    }
    
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors || error.message
    });
  }
};

app.get('/motivate/:mood', verifyToken, validateRequest(moodSchema), async (req, res) => {
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

app.post('/authenticate', validateRequest(loginSchema), async (req, res) => {
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

app.post('/signup', validateRequest(signupSchema), async (req, res) => {
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
