const openAI = require("openai");
const User = require('../models/userModel');
const { GPT_API_KEY } = require('../config/env');

const client = new openAI.OpenAI({ apiKey: GPT_API_KEY });

// Get motivation based on mood
const getMotivation = async (req, res) => {
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
};

// Get personalized motivation based on user profile and mood
const getPersonalizedMotivation = async (req, res) => {
    const { mood } = req.params;
    const userId = req.user.id;
    
    try {
        // Get user profile information
        const user = await User.getUserById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Create a personalized prompt based on user profile
        const prompt = `Write a very short personalized motivational message for ${user.firstname} who is feeling ${mood}.
        
        About them: ${user.about || 'Not provided'}
        Their big dream: ${user.bigDream || 'Not provided'}
        What inspires them: ${user.inspiration || 'Not provided'}
        Obstacles they face: ${user.obstacles || 'Not provided'}
        Their fears: ${user.fears || 'Not provided'}
        Their regrets: ${user.regrets || 'Not provided'}`;
        
        const completions = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
              role: "user",
              content: prompt
            }]
        });

        res.status(200).json(completions);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e});
    }
};

module.exports = {
    getMotivation,
    getPersonalizedMotivation
}; 