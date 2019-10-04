const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const verifyToken = require('../controllers/authControllers');

const User = require('../models/user');

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    try {
        user.password = await user.encryptPassword(user.password);
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: 86400
        });

        res.json({ auth: true, token: token });
    } catch (error) {
        res.send(error);
    }
});

// Ruta del perfil de usuario
router.get('/profile', verifyToken, async (req, res) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.json(user);

});

// Logueo de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).send('El correo no existe');

    const validPassword = await user.validatePassword(password);
    if (!validPassword) return res.status(401).json({ auth: false, token: null });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 86400
    });

    res.json({ auth: true, token });
});

module.exports = router;