
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

