
# setup
NB: errors/authenticated is not used here

---create .env 

# Product model
name, price , image fields

# Basic structure

1.-Product controller.js: import ststus code, Product model
ne for creating the product and the other for getting all products
 
2.upload controller: method to upload product image

--setup routes: import controllers files
--import routes in the App.js
//to access data in res.body
app.use(express.json())

# postman
New collection
{{URL}}/products/uploads
{{URL}}/products

# create product
controllers/productController/
-method createProduct
### Test with postman
challenge: uploading via postman: body - raw - json
-we need a path, to be uploaded on a server
NB: we need a path to upload the file to the server first
then after the path, we can create the image

# upload image
-since we don't have a path to create a product with image param,
then we need to send response with the correct path

upload image - body - form-data
image:select file
NB: if we log the req, in the upload controller, we get empty object
so, we need express-fileupload package, then, we can see the image path

# express fileupload
npm i express-fileupload
-import into App.js
-invoke it app.use(fileUpload());
 console.log(req.files);
 payload:
 {
  image: {
    name: 'carbon.jpeg',
    data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 43 00 05 03 04 04 04 03 05 04 04 04 05 05 05 06 07 0c 08 07 07 07 07 0f 0b 0b 09 ... 55217 more bytes>,
    size: 55267,
    encoding: '7bit',
    tempFilePath: '',
    truncated: false,
    mimetype: 'image/jpeg',
    md5: 'fd578f6a60029f7b51ba131a062a3d7e',
    mv: [Function: mv]
  }
}
 -post again to see the name of the file at the bottom of the log
 ##upload controller
 const path = require('path')
 -after creating the path, create the move mv function , callback or return a promise
 await prodductImage.mv(imagePath);
 -create a new folder in public
 -run postman and check the public folder/uploads to see the uploaded image
and make the public folder available in App.js
-run postman
{
    "image": {
        "src": "/uploads/carbon.jpeg"
    }
}
-copy the response path from postman and post on web:http://localhost:3000/uploads/carbon.jpeg

IDEA: upload image first, get the correct path, then create product
NB: we use src because, we will use it in FE in the image path
-public folder resides on the server

WHy not full path?
- no need as it will be attach to the FE url automatically
NB: On the FE when we upload, we make a request to uploads controller

# Addditinal checks
-if image exist, file size not bigger than specified
-upload controler

# cloudinary
-storing images in the cloud
-free tier: create an accout : you need cloud name, API key, API secret

# cloudinary setup
npm i cloudinary
-App.js: import, use v2

# uplaod image to cloudinary
-uploadController.js
-import cloudinary with v2
IDEA: we need a temp file to store the image locally before sending it to cloud, hence, we add the useTempFile option in App.js - express fileUpload
Then pass it in the function
-log(req.files) to see the tempFile var
{
  image: {
    name: 'image.png',
    data: <Buffer >,
    size: 17624,
    encoding: '7bit',
    tempFilePath: '/Users/baremu/file_image/starter/tmp/tmp-1-1714592717792',
    truncated: false,
    mimetype: 'image/png',
    md5: 'f4cc04e1f2912a6d8584dc1791622494',
    mv: [Function: mv]
  }
}

NB: you will see a tmp folder in the project root
NB: express file upload gives access to req.files.image

-create a folder in cloudinary: file explorer/new folder and use the folder name in the folder option of the app.
folder:'file-upload'

Test: upload a file on postman and check the terminal and go to cloudinary folder to check the new file
{
  asset_id: '7101bac085276875d3717677ac16ae7d',
  public_id: 'file-upload/tmp-1-1714593554029_sjmhyx',
  version: 1714593555,
  version_id: '72a065a629f3446f636f98cfd67edb07',
  signature: '189ec44831c66414f6bac968a331c8cf491ad0c7',
  width: 580,
  height: 302,
  format: 'png',
  resource_type: 'image',
  created_at: '2024-05-01T19:59:15Z',
  tags: [],
  bytes: 17624,
  type: 'upload',
  etag: 'f4cc04e1f2912a6d8584dc1791622494',
  placeholder: false,
  url: 'http://res.cloudinary.com/dkc95nltl/image/upload/v1714593555/file-upload/tmp-1-1714593554029_sjmhyx.png',
  secure_url: 'https://res.cloudinary.com/dkc95nltl/image/upload/v1714593555/file-upload/tmp-1-1714593554029_sjmhyx.png',
  folder: 'file-upload',
  original_filename: 'tmp-1-1714593554029',
  api_key: '*******'
}

NB: secure_url is where the image is accessible on cloudinary
NB: FE is expecting { image: { src: }}

Run postman to send response on postman
{
    "image": {
        "src": "https://res.cloudinary.com/dkc95nltl/image/upload/v1714594222/file-upload/tmp-1-1714594219755_brkpod.jpg"
    }
}

copy the url and open on a browser

# remove temp folder
-import filesystem fs
fs.unlinkSync(req.files.image.tempFilePath);
-not storing files locally anymore
-go to media library on cloudinary to check


