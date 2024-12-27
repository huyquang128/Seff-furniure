const {
    ParentMenu,
    SubChildMenu,
    ChildMenu,
} = require('../../models/menuModel');

const getAllMenu = async (req, res) => {
    try {
        const menus = await ParentMenu.find()
            .populate({
                path: 'children',
                populate: [
                    { path: 'products' }, // Populate các sản phẩm trong `children`
                    { path: 'subChildren', populate: { path: 'products' } }, // Populate các sản phẩm trong `subChildren`
                ],
            })
            .populate({ path: 'products' })
            .exec();
        res.json({ success: true, data: menus });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const getChildMenu = async (req, res) => {
    try {
        const childMenu = await ChildMenu.find().populate({
            path: 'products',
        });
        res.json({ success: true, data: childMenu });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

// sub children menu
const addSubChildMenu = async (req, res) => {
    const { parentId } = req.params;
    const { title, link, products } = req.body;

    try {
        const newSubChildMenu = new SubChildMenu({
            title,
            link,
            products,
        });
        await newSubChildMenu.save();

        const updatedParentMenu = await ChildMenu.findByIdAndUpdate(
            parentId,
            { $push: { subChildren: newSubChildMenu._id } },
            { new: true }
        );

        if (!updatedParentMenu) {
            return res.status(404).json({ message: 'Parent menu not found' });
        }

        res.json({
            message: 'Child menu added successfully and parent menu updated',
            newSubChildMenu,
            updatedParentMenu,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

//add child menu
const addChildMenu = async (req, res) => {
    const { parentId } = req.params;
    const { title, link, products, subChildren } = req.body;
    try {
        const newChildMenu = new ChildMenu({
            title,
            link,
            products,
            subChildren,
        });

        await newChildMenu.save();

        const updatedParentMenu = await ParentMenu.findByIdAndUpdate(
            parentId,
            { $push: { children: newChildMenu._id } },
            { new: true }
        );

        if (!updatedParentMenu) {
            return res.status(404).json({ message: 'Parent menu not found' });
        }

        res.json({
            message: 'Child menu added successfully and parent menu updated',
            newChildMenu,
            updatedParentMenu,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

//parent menu
const addParentMenu = async (req, res) => {
    try {
        const { title, link, products, children } = req.body;
        const newParentMenu = new ParentMenu({
            title,
            link,
            products,
            children,
        });
        await newParentMenu.save();
        res.status(200).json({
            success: true,
            message: 'parent menu added successfully!',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = {
    getAllMenu,
    addSubChildMenu,
    addParentMenu,
    addChildMenu,
    getChildMenu,
};
