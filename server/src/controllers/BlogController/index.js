const { uploadImage } = require('../../helper/cloudinary');
const Blog = require('../../models/blogModel');

const getBlogPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    try {
        const blogs = await Blog.find()
            .sort({ _id: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalBlog = await Blog.countDocuments();

        // Tính tổng số trang
        const totalPages = Math.ceil(totalBlog / limit);

        res.json({
            success: true,
            data: { blogs, totalBlog, totalPages, currentPage: page },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const postBlog = async (req, res) => {
    const { title, content, author } = req.body;
    const image = req.file;
    try {
        const imageCL = await uploadImage(image);
        const newBlog = new Blog({
            title,
            content,
            author,
            image: imageCL.secure_url,
        });
        await newBlog.save();
        res.json({ success: true, data: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const removeBlog = async (req, res) => {
    const { blogId } = req.params;
    try {
        await Blog.findByIdAndDelete(blogId);
        res.json({ success: true, message: 'Blog deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = { getBlogPage, postBlog, removeBlog };
