const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dgm8gio7e',
    api_key: '575847525273774',
    api_secret: 'qjgdjg1H9oapYZd96Sjv78bxYEM',
});

cloudinary.api.ping((error, result) => {
    if (error) {
        console.error('Cloudinary connection failed:', error);
    } else {
        console.log('Cloudinary connection successful:', result);
    }
});

const storage = multer.memoryStorage();

//upload_stream
const uploadImage = async (image) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'sell_furniture' },
            (error, imageResult) => {
                if (error) {
                    console.error('Upload failed:', error);
                    reject(error);
                } else {
                    console.log('Upload successful:', imageResult);
                    resolve(imageResult);
                }
            }
        );
        stream.end(image.buffer);
    });
};

//upload
const uploadImageBasic = async (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            image,
            {
                resource_type: 'image',
            },
            (error, imageResult) => {
                if (error) {
                    console.error('Upload failed:', error);
                    reject(error);
                } else {
                    console.log('Upload successful:', imageResult);
                    resolve(imageResult);
                }
            }
        );
    });
};

const upload = multer({ storage });
module.exports = { upload, uploadImage, uploadImageBasic };
