# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Fs

---

## How to Run
```
npm start
```

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints

### Suppliers

#### GET /api/supplier

> Get all suppliers

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_supplier>
  ],
  "status": "Success"
}
```

---

#### GET /api/supplier?id=

> Get supplier by ID (with its categories)

_Request Queries_
```
?id=<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "supplier_name": <supplier_name>,
    "contact_phone": <contact_phone>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "Categories": [
      <list_of_categories>
    ]
  },
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "Supplier Not Found"
}
```

---  
  
#### POST /api/supplier

> Create supplier with its categories

_Request Header_
```
not needed
```

_Request Body_
```
{
  "supplier_name": <supplier_name>,
  "contact_phone": <contact_phone>,
  "category_ids": [ <list_of_category_ids> ]
}
```

_Response (201)_
```
{
  "data": {
    "id": <id>,
    "supplier_name": <supplier_name>,
    "contact_phone": <contact_phone>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "Categories": [
      <list_of_categories>
    ]
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"category_ids\" is required"
}
```

_Response (400 - Duplicate Supplier Name)_
```
{
  "message": "Supplier with this name already existed"
}
```

_Response (400 - Category IDs don't exist)_
```
{
  "message": "Some category ids not exist"
}
```

---

#### PUT /api/supplier/:id

> Update supplier (with its categories)

_Request Params_
```
/<id>
```

_Request Header_
```
not neeeded
```

_Request Body_
```
{
    "supplier_name": <supplier_name>,           // optional (but not empty)
    "contact_phone": <contact_phone>,           // optional (but not empty)
    "category_ids": [ <list_of_category_ids> ]  // optional (but not empty array)
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "supplier_name": <supplier_name>,
    "contact_phone": <contact_phone>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "Categories": [
      <list_of_categories>
    ]
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"category_ids\" must contain at least 1 items"
}
```

_Response (404 - Supplier Not Found)_
```
{
  "message": "Supplier Not Found"
}
```

_Response (400 - Some category ids not exist)_
```
{
  "message": "Some category ids not exist"
}
```

_Response (400 - Duplicate Supplier Name)_
```
{
  "message": "Supplier with this name already existed"
}
```

---

#### DELETE /api/supplier/:id

> Delete supplier (with its relationship with categories)

_Request Params_
```
/<id>
```

_Request Header_
```
not neeeded
```

_Response (200)_
```
{
  "data": [
    <list_of_suppliers>
  ],
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "Supplier Not Found"
}
```

---

### Categories

#### GET /api/category

> Get all categories

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_categories>
  ],
  "status": "Success"
}
```

---

#### GET /api/category?id=

> Get category detail (with its suppliers)

_Request Queries_
```
?id=<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "category_name": <category_name>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "Suppliers": [
      <list_of_suppliers>
    ],
    "Products": [
      <list_of_products>
    ]
  },
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "Category Not Found"
}
```

---

#### POST /api/category

> Create category

_Request Header_
```
not needed
```

_Request Body_
```
{
  "category_name": <category_name>
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "category_name": <category_name>,
    "updatedAt": <createdAt>,
    "createdAt": <updatedAt>
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"category_name\" is not allowed to be empty"
}
```

_Response (400 - Duplicate Category Name)_
```
{
  "message": "Category with this name already existed"
}
```

---

#### PUT /api/category/:id

> Update the category (not with its relationship with Suppliers)

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "category_name": <category_name>
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "category_name": <category_name>,
    "updatedAt": <createdAt>,
    "createdAt": <updatedAt>
    "Suppliers": []
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"category_name\" is not allowed to be empty"
}
```

_Response (404 - Category Not Found)_
```
{
  "message": "Category Not Found"
}
```

_Response (400 - Duplicate Category Name)_
```
{
  "message": "Category with this name already existed"
}
```

---

#### DELETE /api/category/:id

> Delete the category (but it must not have relationship with products and suppliers)

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_categories>
  ],
  "status": "Success"
}
```

_Response (404 - Category Not Found)_
```
{
  "message": "Category Not Found"
}
```

_Response (400 - Still have relationship with its products)_
```
{
  "message": "Some products with this category exist"
}
```

_Response (400 - Still have relationship with its suppliers)_
```
{
  "message": "Some suppliers with this category exist"
}
```

---

### Products

#### GET /api/product

> Get all products

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_products>
  ],
  "status": "Success"
}
```

---

#### GET /api/product?id=

> Get a product

_Request Queries_
```
?id=<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "name": <name>,
    "description": <description>,
    "price": <price>,
    "quantity_in_stock": <quantity_in_stock>,
    "categoryId": <categoryId>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "productCategory": >productCategory>
  },
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "Product Not Found"
}
```

---

#### POST /api/product

> Create a product

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": <name>,
  "description": <description>,
  "price": <price>,
  "quantity_in_stock": <quantity_in_stock>, // optional
  "categoryId": <categoryId>
}
```

_Response (201)_
```
{
  "data": {
    "id": <id>
    "name": <name>,
    "description": <description>,
    "price": <price>,
    "quantity_in_stock": <quantity_in_stock>
    "categoryId": <categoryId>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "productCategory": {
      <productCategoryDetail>
    }
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"categoryId\" is required"
}
```

_Response (400 - Duplicate Product Name)_
```
{
  "message": "Product with this name already existed"
}
```

_Response (400 - Category Not Found)_
```
{
  "message": "Category not found"
}
```

---

#### PUT /api/product/:id

> Update a product (except `quantity_in_stock`)

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": <name>,               // optional but not empty
  "description": <description>, // optional but not empty
  "price": <price>,             // optional but not empty
  "categoryId": <categoryId>,   // optional but not empty
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>
    "name": <name>,
    "description": <description>,
    "price": <price>,
    "quantity_in_stock": <quantity_in_stock>
    "categoryId": <categoryId>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "productCategory": {
      <productCategoryDetail>
    }
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"description\" is not allowed to be empty"
}
```

_Response (404 - Product Not Found)_
```
{
  "message": "Product not found"
}
```

_Response (400 - Duplicate Product Name)_
```
{
  "message": "Product with this name already existed"
}
```

_Response (404 - Category Not Found)_
```
{
  "message": "Category not found"
}
```

---

#### DELETE /api/:id

> Delete a product

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_products>
  ],
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "Product Not Found"
}
```

---

### Supplier_Category

#### POST /api/supplier-category

> Add a relationship between `Supplier` and `Category`

_Request Header_
```
not needed
```

_Request Body_
```
{
  "supplierId": <supplierId>,
  "categoryId": <categoryId>
}
```

_Response (201)_
```
{
  "data": {
    "id": <id>,
    "supplier_name": <supplier_name>,
    "contact_phone": <contact_phone>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "Categories": [
      <list_of_categories>
    ]
  },
  "status": "Success"
}
```

_Response (404 - Supplier Not Found)_
```
{
  "message": "Supplier Not Found"
}
```

_Response (404 - Category Not Found)_
```
{
  "message": "Category Not Found"
}
```

_Response (400 - Relationship Already Exist)_
```
{
  "message": "This supplier_category already exist"
}
```

---

#### DELETE /api/supplier-category

> Delete a relationship between `Category` and `Supplier`

_Request Header_
```
not needed
```

_Request Body_
```
{
  "supplierId": <supplierId>,
  "categoryId": <categoryId>
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "supplier_name": <supplier_name>,
    "contact_phone": <contact_phone>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "Categories": [
      <list_of_categories>
    ]
  },
  "status": "Success"
}
```

_Response (404 - Supplier_Category Not Found)_
```
{
  "message": "Supplier_category Not Found"
}
```

---