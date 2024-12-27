const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uploadImageBasic, uploadImage } = require('../../helper/cloudinary');
const { default: mongoose } = require('mongoose');

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

const getProfileUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const userInfo = await User.findById(userId, {
            password: 0,
        });
        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }
        const userObject = userInfo.toObject();
        res.json({
            success: true,
            data: { ...userObject, id: userObject._id },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const addProfileUser = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, phone, email } = req.body;

    try {
        // // Chuyển đổi userId thành ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ success: false, message: 'Invalid user ID!' });
        }
        const userConvertObj = new mongoose.Types.ObjectId(userId);

        const user = await User.findOneAndUpdate(
            { _id: userConvertObj },
            {
                $set: {
                    firstName,
                    lastName,
                    phone,
                    email,
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

const addAddressUser = async (req, res) => {
    const { userId } = req.params;
    const {
        firstName,
        lastName,
        phone,
        detailAddress,
        province,
        district,
        ward,
    } = req.body;

    try {
        const userObj = new mongoose.Types.ObjectId(userId);

        const user = await User.findOne({ _id: userObj });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found!' });
        }

        console.log(typeof user.address);

        user.address.push({
            firstName,
            lastName,
            phone,
            detailed: detailAddress,
            province,
            district,
            ward,
        });
        await user.save();

        res.json({
            success: true,
            message: 'Đã thêm địa chỉ mới!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const updateAddressUser = async (req, res) => {
    const { userId } = req.params;
    const {
        addressId,
        firstName,
        lastName,
        phone,
        detailAddress,
        province,
        district,
        ward,
    } = req.body;

    try {
        // Tìm user dựa trên userId
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found!' });
        }

        // Tìm địa chỉ cần cập nhật
        const address = user.address.find(
            (address) => address._id.toString() === addressId
        );

        if (!address) {
            return res
                .status(404)
                .json({ success: false, message: 'Address not found!' });
        }

        // Cập nhật các trường trong đối tượng địa chỉ
        address.firstName = firstName;
        address.lastName = lastName;
        address.phone = phone;
        address.detailed = detailAddress;
        address.province = province;
        address.district = district;
        address.ward = ward;

        // Lưu user
        await user.save();

        res.json({
            success: true,
            message: 'Đã cập nhật địa chỉ thành công!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const removeAddressUser = async (req, res) => {
    const { userId } = req.params;
    const { addressId } = req.query;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found!' });
        }
        const index = user.address.findIndex(
            (address) => address._id.toString() === addressId
        );

        if (index === -1) {
            return res
                .status(404)
                .json({ success: false, message: 'Address not found!' });
        }
        user.address.splice(index, 1);
        await user.save();
        res.json({
            success: true,
            message: 'Đã xóa địa chỉ thành công!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const getAllUser = async (req, res) => {
    try {
        const user = await User.find({ role: { $ne: 'admin' } });

        res.json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const addUser = async (req, res) => {
    const { username, email, password, phone } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            res.json({ success: false, message: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'Đã thêm khách hàng thành công!',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const removeSingleUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found!' });
        }
        res.json({ success: true, message: 'remove user successfully!!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = {
    register,
    login,
    logout,
    authMiddleware,
    addProfileUser,
    uploadAvatar,
    getProfileUser,
    addAddressUser,
    updateAddressUser,
    removeAddressUser,
    getAllUser,
    addUser,
};
