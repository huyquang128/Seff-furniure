const { Product } = require('../../models/productModel');
const removeAccents = require('remove-accents');
const {
    ParentMenu,
    SubChildMenu,
    ChildMenu,
} = require('../../models/menuModel');
const { uploadImage } = require('../../helper/cloudinary');

const getAllProductFromLivingRoom = async (req, res) => {
    try {
        const products = await ParentMenu.find().populate('products').exec();
        res.json({ success: true, data: products[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const addProductsAndAddAllMenu = async (req, res) => {
    try {
        const {
            name,
            brand,
            description,
            price,
            sold,
            material,
            size,
            infoProduct,
            parentMenu,
            childMenu,
            subChildMenu,
            sale,
        } = req.body;

        const colorArray = [];

        const uploadImages = async (images) => {
            const uploadedImg = [];
            for (const image of images) {
                const result = await uploadImage(image);
                uploadedImg.push(result.secure_url);
            }
            return uploadedImg;
        };

        if (req.files.white) {
            const uploadedImagesWhite = await uploadImages(
                req.files.white.map((file) => file)
            );
            colorArray.push({ colorId: 'white', images: uploadedImagesWhite });
        }

        if (req.files.blue) {
            const uploadedImagesBlue = await uploadImages(
                req.files.blue.map((file) => file)
            );
            colorArray.push({ colorId: 'blue', images: uploadedImagesBlue });
        }

        if (req.files.green) {
            const uploadedImagesGreen = await uploadImages(
                req.files.green.map((file) => file)
            );
            colorArray.push({
                colorId: 'green',
                images: uploadedImagesGreen,
            });
        }

        if (req.files.orange) {
            const uploadedImagesOrange = await uploadImages(
                req.files.orange.map((file) => file)
            );
            colorArray.push({
                colorId: 'orange',
                images: uploadedImagesOrange,
            });
        }

        if (req.files.pink) {
            const uploadedImagesPink = await uploadImages(
                req.files.pink.map((file) => file)
            );
            colorArray.push({ colorId: 'pink', images: uploadedImagesPink });
        }

        if (req.files.gray) {
            const uploadedImagesGray = await uploadImages(
                req.files.gray.map((file) => file)
            );
            colorArray.push({
                colorId: 'gray',
                images: uploadedImagesGray,
            });
        }
        if (req.files.red) {
            const uploadedImagesRed = await uploadImages(
                req.files.red.map((file) => file)
            );
            colorArray.push({ colorId: 'red', images: uploadedImagesRed });
        }

        if (req.files.black) {
            const uploadedImagesBlack = await uploadImages(
                req.files.black.map((file) => file)
            );
            colorArray.push({ colorId: 'black', images: uploadedImagesBlack });
        }

        if (req.files.brown) {
            const uploadedImagesBrown = await uploadImages(
                req.files.brown.map((file) => file)
            );
            colorArray.push({
                colorId: 'brown',
                images: uploadedImagesBrown,
            });
        }
        if (req.files.purple) {
            const uploadedImagesPurple = await uploadImages(
                req.files.purple.map((file) => file)
            );
            colorArray.push({
                colorId: 'purple',
                images: uploadedImagesPurple,
            });
        }

        if (req.files.be) {
            const uploadedImagesBe = await uploadImages(
                req.files.be.map((file) => file)
            );
            colorArray.push({ colorId: 'be', images: uploadedImagesBe });
        }

        if (req.files.yellow) {
            const uploadedImagesYellow = await uploadImages(
                req.files.yellow.map((file) => file)
            );
            colorArray.push({
                colorId: 'yellow',
                images: uploadedImagesYellow,
            });
        }

        const newProduct = await Product({
            name,
            brand,
            description,
            price,
            sold,
            material,
            size: {
                width: size.width,
                height: size.height,
                length: size.length,
            },
            infoProduct: {
                detail_Product: infoProduct.detail_Product,
                Essential_Information: infoProduct.Essential_Information,
                Safety_Standards: infoProduct.Safety_Standards,
                Product_Features: infoProduct.Product_Features,
            },
            sale,
            parentMenu,
            childMenu,
            subChildMenu,
            colors: colorArray,
        });

        await newProduct.save();

        const updateMenu = async (menuModel, menuTitle) => {
            const result = await menuModel.findOneAndUpdate(
                { title: menuTitle },
                { $push: { products: newProduct._id } },
                { new: true }
            );

            if (!result) {
                console.warn(`Menu with title "${menuTitle}" not found.`);
            }
        };

        await updateMenu(ParentMenu, parentMenu);
        await updateMenu(ChildMenu, childMenu);
        await updateMenu(SubChildMenu, subChildMenu);

        res.status(201).json({
            success: true,
            message: 'Product added successfully!',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSingleProductByName = async (req, res) => {
    const { productName } = req.params;
    try {
        const product = await Product.findOne({ name: productName });

        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: 'Product not found!' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const searchProductByKeyword = async (req, res) => {
    const { keyword } = req.query;
    try {
        const normalizedKeyword = removeAccents(keyword).toLowerCase();
        const regex = new RegExp(`\\b${normalizedKeyword}\\b`, 'i');
        const products = await Product.find({
            name: { $regex: regex },
        });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const recommendProducts = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);

        const recommend = await Product.find({
            brand: product.brand,
            _id: { $ne: product._id },
        }).limit(3);

        return res.status(200).json({ success: true, data: recommend });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const getProductPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    try {
        const products = await Product.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        // Tổng số sản phẩm
        const totalProducts = await Product.countDocuments();

        // Tính tổng số trang
        const totalPages = Math.ceil(totalProducts / pageSize);

        res.status(200).json({
            success: true,
            data: {
                products, // Danh sách sản phẩm trong trang hiện tại
                totalProducts, // Tổng số sản phẩm trong cơ sở dữ liệu
                totalPages, // Tổng số trang
                currentPage: page, // Trang hiện tại mà người dùng yêu cầu
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = {
    getAllProductFromLivingRoom,
    addProductsAndAddAllMenu,
    getSingleProductByName,
    searchProductByKeyword,
    recommendProducts,
    getProductPage,
};
