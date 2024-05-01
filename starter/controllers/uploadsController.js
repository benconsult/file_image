const path = require('path')
const {StatusCodes} = require('http-status-codes')

const uploadProductImage = async (req,res) =>{
//   console.log(req);
//   console.log(req.files);
let prodductImage = req.files.image;

const imagePath = path.join(__dirname,'../public/uploads/'+`${prodductImage.name}`)
await prodductImage.mv(imagePath);
 
    res.status(StatusCodes.OK).json({ image: {src:`/uploads/${prodductImage.name}`}})
}

module.exports = { uploadProductImage}