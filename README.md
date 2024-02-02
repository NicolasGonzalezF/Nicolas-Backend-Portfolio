## Hello and Welcome to my portfolio.

My name is Nicolas Gonzalez Ferrerosa, i'm a mechatronics engineer and a BackEnd student (2024),
and this is my portfolio that i've builded in my BackEnd studies.

Inside this repository you will find as to 2024 three (3) files.

## Development for Web Design JavaScript 2023:
In this you can find my first project for JavaScript, the assignment was to build a Ecommerce
platform to understand the basics of JavaScript using DOM (Document Oriented Model), in which
you can find a basic page for a mock up store based on the Animal Crossing New Horizons NookShop,
in here we where task to build a page with full design using CS3 and manipulating the page to
change the content showed on screen by pressing the buttons on the menu, we also were tasked to 
keep track of the funds given to a Debug User.

With this project we were also tasked to fix errors that may occur while being tested by an user,
this type of errors that were fixed included: Purchasing items with not enough funds, withdrawing ATM
funds that are over the current funds , adding negative values to the ATM machine.

To boot this project use live server on the index.html file inside the folder Desarrollo Javascript 2023.

## Development for SQL AirLine Project 2023:
For this SQL project we were tasked to create and document a commerce of our choosing, for this i've chosen
to make a Travel plan agency.
In this project we were tasked to create a base Database with tables for users, services and other
information that we required for our commerce like information for hotels, destinations and travels plans
that are available or are in progress.

The sql file was developed in MySql and has all the steps cited in the documentation, from building the database,
populating the database with information and manipulating the documents inside the tables like sorting items, moving items
or adding more travel plans, hotels or users to the database.

## Development for Backend WIP 2024:
For this Backend project we are using JavaScript, Node Js and MongoDB to develop a more robust Ecommerce page,
in this project the focus was shifted from the design of the page to the endpoint connections and use of databases
to pull and manipulate information. Inside this project we were task to use MongoDB as our database storage for 
products, carts and users alongside the current session open, the user management now can be register in to the MongoDatabase
and can be pulled from it to interact with the products inside, on creation of the users a cart is created on which the user can
add or remove items from it, additionally we have a payment mock up that sends the items that have been purchased and sends the receipt to 
the user register email.

We also have a new front development on which we use handlebars to show the information and move inside the page using the method GET to change from
endpoint to endpoint and using pagination to order and show the products with buttons and drop menus. Additionally there's an admin user that is stored locally 
on an env file , the admin user can't  add products to a cart but can access the database to edit any information about the products, create new ones or delete one.

This project is currently under development and requires Nodemon in the app.js to be utilized.


## ENV params
Due for some infomration to be confidential some paramenrts require to be privated please contact me for access to this information


MONGO_URL= ""
hash="" 

KEYSECRET = ""

ADMIN_EMAIL="adminCoder@coder.com"
ADMIN_PASSWORD ="adminCod3r123"

SERVICE_MAIL="gmail"
SERVICE_MAIL_PORT="587"
EMAIL_USER=""
EMAIL_PASSWORD=""

FACTORY="development"
