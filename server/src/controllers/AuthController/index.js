const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uploadImageBasic, uploadImage } = require('../../helper/cloudinary');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            res.json({ success: false, message: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User registered successfully!',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email });
        console.log('🚀 ~ login ~ checkUser:', checkUser);
        if (!checkUser) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found!' });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            checkUser.password
        );
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ success: false, message: 'Password not match!' });
        }
        const token = jwt.sign(
            {
                id: checkUser._id,
                username: checkUser.username,
                email: checkUser.email,
                role: checkUser.role,
            },
            process.env.SECRET_KEY_JWT,
            {
                expiresIn: '365d',
            }
        );

        const user = checkUser.toObject();
        delete user.password;

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: 'User logged in successfully!',
            user: {
                ...user,
                id: user._id,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const updateProfileUser = async (req, res) => {
    const { userId } = req.params;
    console.log('🚀 ~ updateProfileUser ~ userId:', userId);
    console.log('��� ~ updateProfileUser ~ req.body:', req.body);

    try {
        const { firstName, lastName, phone, email, detailAddress } = req.body;
        console.log(
            '🚀 ~ updateProfileUser ~ firstName, lastName, phone, email, detailAddress:',
            firstName,
            lastName,
            phone,
            email,
            detailAddress
        );
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    firstName,
                    lastName,
                    phone,
                    email,
                    address: {
                        detailed: detailAddress,
                    },
                },
                $unset: {
                    fullname: '',
                },
            },
            { new: true }
        );
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found!' });
        }
        res.json({
            success: true,
            message: 'User updated successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const logout = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'User logged out successfully!',
    });
};

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: 'Token not found!' });
        }
        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
            if (err) {
                return res
                    .status(403)
                    .json({ success: false, message: 'Token invalid!' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorised user!',
        });
    }
};

//upload avatar
const uploadAvatar = async (req, res) => {
    const { userId } = req.params;
    console.log('🚀 ~ uploadAvatar ~ userId:', userId);
    try {
        const avatar = req.file;
        console.log('🚀 ~ uploadAvatar ~ avatar:', avatar);

        const imageUploaded = await uploadImage(avatar);

        if (!imageUploaded) {
            return res
                .status(400)
                .json({ success: false, message: 'No avatar provided.' });
        }
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { urlImgAvatar: imageUploaded.secure_url } },
            { new: true }
        );
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found!' });
        }

        res.json({
            success: true,
            message: 'Avatar uploaded successfully!',
            data: user.urlImgAvatar,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = {
    register,
    login,
    logout,
    authMiddleware,
    updateProfileUser,
    uploadAvatar,
};
