const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
    authMiddleware,
    uploadAvatar,
    getProfileUser,
    addProfileUser,
    addAddressUser,
    removeAddressUser,
    updateAddressUser,
    getAllUser,
    addUser,
    removeUser,
    updateUser,
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
router.post('/add-profile-user/:userId', upload.none(), addProfileUser);
router.get('/get-profile-user/:userId', getProfileUser);
router.post('/add-address-user/:userId', addAddressUser);
router.post('/update-address-user/:userId', updateAddressUser);
router.delete('/remove-address-user/:userId', removeAddressUser);
router.get('/get-all-user', getAllUser);
router.post('/add-user', addUser);
router.post('/remove-user', removeUser);
router.post('/update-user/:userId', updateUser);

module.exports = router;
