const express = require('express');
const {
    getAllBlog,
    removeBlog,
    postBlog,
    getBlogPage,
} = require('../controllers/BlogController');
const { upload } = require('../helper/cloudinary');
const router = express.Router();

router.get('/get-blog-page', getBlogPage);
router.post('/post-blog', upload.single('blog-image'), postBlog);
router.delete('/delete-blog', removeBlog);

module.exports = router;
