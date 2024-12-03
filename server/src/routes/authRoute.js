const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
    authMiddleware,
    uploadAvatar,
    updateProfileUser,
} = require('../controllers/AuthController');
const { upload } = require('../helper/cloudinary');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', authMiddleware, (req, res) => {
    try {
        const user = req.user;
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
});
router.post('/upload-avatar/:userId', upload.single('avatar'), uploadAvatar);
router.post('/update-profile-user/:userId', upload.none(), updateProfileUser);

module.exports = router;
