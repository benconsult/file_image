
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
challenge: uploading via postman
-we need a path, to be uploaded on a server
NB: we need a path to upload the file to the server first
then after the path, we can create the image
