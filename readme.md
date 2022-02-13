# Back End Developer Assessment

Hello, I am Joaquin Noguera V. and in this document I will give you a step by step of my thought process to complete this challenge.

## Installation
Follow the steps below to get started with this project's development environment and run the server.

1. Install Nodev12.x+ from https://nodejs.org/es/about/releases/.
2. Clone this repository.
    ```
    $ git clone git@github.com:JoaquinNoguera/Back-End-Developer-Assessment.git
    ```
3. Navigate to the project directory.
4. Install all the dependencies.
    ```
    npm i
    ```
5. Fill all the fields in the .env file (see .env-defaults) or have all the environment variables set .
6. Generate a production build of the code.
    ```
    npm run build
    ```
8. Run the server.
    ```
    npm run start
    ```
If you wanna run the server in development mode, you can also execute the next code instead:
```
npm run start:dev
```

## Brief introduction of the technical approach 
In order to solve this challenge, I tried to stay with a classic structure, my main goal was to make it easier to make future modifications.
The requirements made clear the functionality that the code should fulfill but without much detail. 
Taking this into account, I built a REST API with the MVC model with a NoSQL database (MongoDB).  
The choice of a NoSQL database over an SQL one was due to the fact that a NoSQL database is more flexible when making changes to the data structure it refers to, which in this is really useful and can be a very good feature.

## Folder Structure
For the folder structure, I chose a basic approach respecting the MCV model of course. If I had to highlight something, it is the decision to split the logic of the project in the api (logic files) and the config (configuration files) folder. In this case, being a small project, the only configuration files correspond to the database
```
.
├──dist                             # Compiled files
├──src                              # Source code files
|  ├── api                          # Files related to the logic
|  |    ├── controllers             # Controllers files
|  |    ├── interfaces              # Interfaces files of the difrent type of data 
|  |    ├── middlewares             # Middlewares files, such as the errorHandling
|  |    ├── models                  # MongoDB models files
|  |    └── routes                  # Routes files
|  ├── config                       # Files related to configuration, such as the database configuration
|  └── main.ts                      # Main source code
├── .env                            # Environment Variables
└── README.md
```

## Database schemas
### User
I decide to have and user schema document because for me having and owner of the shopping cart it was something really necessary, and this document it contains all basic information. 
#### Fields
``` ts
user:{
    fullname: {
            firstname: String,         
            lastname: String          
    },   
    email: String,
    listShoppingCart: [String]        //List of shopping carts id related to the user.
} 
```

### Item
I decide to have and item schema document to save the basic information about a item product.
``` ts
item: {
    name: String,
    description: String,
    price: {                           //The price is composed for value and the currency of this
            priceNumber: Number,
            currency: String
    }
}
```

### Shopping Cart
I decide to split the logic of the shopping cart in two schemas document, the first one is the shopping cart shema that save all the basic information about the cart and the different amount of this. And a child schema that represent every individual item that we add to the shopping cart, that saves te values, discount and all the changes that we can aply to a product individualy in the shopping cart.

#### Shoping Cart
```ts
shoppingCart:{
    owner: String,                //user owner id
    taxes: Number,                //porcentage of the taxes
    subtotal: Number,             //subtotal of the entire shopping cart
    total: Number       
    abandoned: Boolean,
    items: Array<ItemCart>
}  
```


#### Item Cart
``` ts
itemCart: {
    cant: Number,                  //Quantity of product items 
    subtotal: Number,              //Subtotal of the price
    discount: {                    //Discount applied to the product, it can be by value or percentage 
        discountType: Number,
        amount: Number
    }
    item: String,                   //Id of the associated product item. 
    itemPrice: Number               //price of the product when was added to the shopping cart
}
```

## API Documentation
The entire API interacts in the same way, since it is a simple exercise, there will be the classic functionalities of an API rest for each of the objects in the database. Nevertheless in the case of further development in the future there would be one of the priority thing to change. This change will for a greater definition and clarification of each functionality that the REST API can or will be able to offer

```http
GET /documentName                                              
GET /documentName?id=12345678901234567890123456789012           
POST /documentName
PATCH /documentName?id=12345678901234567890123456789012
DELETE /documentName?id=12345678901234567890123456789012
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `documentName` | `object` | It is the name of the document with which we want to interact
| `id` | `string` | Is the id of the object
| `body`  | `object` | In the body in the case of the PATCH and POST will need to add the object of the document that we want to modify or add to the database

### Responses
The kind of response that we might get off this API are the follow ones:
- GET Request with out the id parameter:
    ```ts
    Array<documentObject>
    ```
- GET Request with the id parameter:
    ```ts 
    documentObject
    ```
- POST Request:
    ```ts
    documentObject
    ```
- PATCH Request:
    ```ts
    documentObject
    ```
- DELETE Request:
    ```ts
    true
    ```
- ERROR RESPONSE (any request):
    ```ts
    {
        status: Number,
        message: String
    }
    ```

### Status Codes

The API returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |


## What would I do better?
This is just an example and I focus mostly in what kind of basic structure I will use normally, but I left behind a lot of necessary things just like:

- Test classes using for example Jest, to ensure the proper functioning of the code.
- A validation handler for the different kind of data.
- Some kind of authentication, probably oAuth.
- Improve the error handler to be able to handle different kind of exceptions.
- Create better endpoints, depending on the needs of the project, in this example I create only the basic ones in order to interact with the database but I could definitely split the logic into smaller functions. 
- Improve code compilation to have a better performance.