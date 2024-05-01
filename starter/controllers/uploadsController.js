const path = require('path')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2

//local storage - update 
const uploadProductImageLocal = async (req,res) =>{
//   console.log(req);
//   console.log(req.files);

//check if file exists
if(!req.files){
    throw new CustomError.BadRequestError('No file uploaded');
}
const prodductImage = req.files.image;

//check format
if(!prodductImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('Please upload an image');
}

//check image size
const maxSize = 1024 * 1024;//1000 is 1KB
if(prodductImage.size > maxSize){
    throw new CustomError.BadRequestError('Please upload image smaller than 1KB')
}

const imagePath = path.join(__dirname,'../public/uploads/'+`${prodductImage.name}`)
await prodductImage.mv(imagePath);
 
    res.status(StatusCodes.OK).json({ image: {src:`/uploads/${prodductImage.name}`}})
}
//cloudinary
const uploadProductImage = async (req,res)=>{
    //console.log(req.files);//upload an image on postman to test
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, { use_filename:true, folder:'file-upload'});
    //console.log(result); //test 
    return res.status(StatusCodes.OK).json({ image : { src: result.secure_url}});
};
module.exports = { uploadProductImage}