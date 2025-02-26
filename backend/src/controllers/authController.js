const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken, setTokenCookie, clearTokenCookie } = require('../utils/tokenUtils');

// Login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.getUserByEmail(email);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = generateToken(user);

        // Set token as cookie
        setTokenCookie(res, token);

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
};

// Signup controller
const signup = async (req, res) => {
    const { firstname, lastname, email, password, about, bigDream, inspiration, obstacles, fears, regrets } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user data object
        const userData = {
            firstname,
            lastname,
            email,
            password: hashedPassword,
            about,
            bigDream,
            inspiration,
            obstacles,
            fears,
            regrets
        };

        // Insert user into database
        const userId = await User.createUser(userData);

        // Generate JWT Token
        const token = generateToken({ id: userId, email });

        // Set token as cookie
        setTokenCookie(res, token);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout controller
const logout = (req, res) => {
    clearTokenCookie(res);
    res.status(200).json({ message: 'Logged out successfully' });
};

// Get current user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.getUserById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Remove password from response
        const { password, ...userProfile } = user;
        
        res.json(userProfile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    const { firstname, lastname, about, bigDream, inspiration, obstacles, fears, regrets } = req.body;
    
    try {
        const userData = {
            firstname,
            lastname,
            about,
            bigDream,
            inspiration,
            obstacles,
            fears,
            regrets
        };
        
        const success = await User.updateUser(req.user.id, userData);
        
        if (!success) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Change password
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    try {
        const user = await User.getUserById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password
        const success = await User.updatePassword(req.user.id, hashedPassword);
        
        if (!success) {
            return res.status(500).json({ message: 'Failed to update password' });
        }
        
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Refresh token
const refreshToken = async (req, res) => {
    try {
        // User is already authenticated via verifyToken middleware
        const { id, email } = req.user;
        
        // Generate a new token
        const token = generateToken({ id, email });
        
        // Set the new token as a cookie
        setTokenCookie(res, token);
        
        res.json({ message: 'Token refreshed successfully', token });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    login,
    signup,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    refreshToken
}; 