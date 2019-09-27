const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Register New User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    try {
        user.password = await user.encryptPassword(user.password);
        // console.log(user);
        await user.save();
        res.json(user);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;