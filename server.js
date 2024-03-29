// // function add(a, b) {
// //     return a + b;
// // }
// var add = (a, b) => a + b;
// console.log(add(20, 68));

// (function () {
//     console.log("I am Meta");
// })();

//callback function(jab main function ka kaam khatm ho jayega then callback run hoga)
/*function callback() {
console.log("calling a callback funtion");
}
const add = function (a, b, callback) {
    console.log(a + b);
    callback();
}
add(3, 5, callback) */

// const add = function (a, b, func) {
//     var res = a + b;
//     console.log(res);
//     func();
// }
// add(23, 23, function () {
//     console.log("add completed");
// }); or
// add(23, 45, () => console.log('add completed'));




//Library of node js like os and file system fs
/*var fs = require('fs');
var os = require('os');
var user = os.userInfo();
console.log(user)
console.log(user.username)

fs.appendFile('greeting.txt', 'Hi' + user.username + '!\n', () => {
    console.log('file is created')
})
console.log(fs)*/

//Importing file
/*
const notes = require('./notes.js');
// var_ = require('lodash');//normal convention
var f = require('lodash');

console.log('server file is loaded')
var age = notes.age;
console.log(age);
var res = notes.addNumber(age, 18);
console.log(res);

var data = ["person", 'person', 1, 2, 1, 2, 'name', 'age', '2'];
var filter = f.uniq(data);
console.log(filter);

console.log(f.isString(1));*/


//Day-3 Talking about Client, server and database

//Json to Pbject
/*const jsonstr = `{
    "name": "Nitin Manoj",
    "age":"21",
    "city":"Patna"
    }`;
const obj = JSON.parse(jsonstr);
console.log(obj.name);*/

//Object to json

/*const obj = {
    name: "Nitin Manoj",
    age: 21,
    city: "Hajipur"
}
const jsontr = JSON.stringify(obj)
console.log(jsontr);
console.log(typeof jsontr) */



//Server banane ki prakriya

/*
const express = require('express')
const app = express()//blueprint hai jisko app me store kar liye,app ke pass saara functionality available hai ab

app.get('/', function (req, res) { //req=request and res=response
    res.send('Welcome to my hotel... How may i help you')
})
app.get('/chicken', (req, res) => {
    res.send('Sure Sir, I would love to serve you chicken😁');
})
app.get('/idli', (req, res) => {
    var customixed_idli = {
        name: "Rara Idli",
        size: "10cm lamba",
        is_sambhar: true,
        is_chutney: false
    }
    // res.send('Sure Sir, I would love to serve you idli');
    res.send(customixed_idli);
})
app.post('/items', (req, res) => {
    console.log("data saved and displayed on terminal")
    res.send("data is saved");
})

app.listen(2000, () => {
    console.log('listening on Port 2000')
})
*/



//Day-4 (MongoDB Commands) MongoDB  provides a powerful shell for interacting with MongoDB.
/*
Stores in form of collections(JSON format)
Each collection contains documents/records
1. To run mongoDB- mongo
2. check version- mongo --version
3. show databases
4. to end- exit
5. use db(to get in those database)
6.ab iss db wale collection kitne present hai--  show collections(all tables dikh jayega relate to sql)
7.Create a table in SQL is like (terminal commands)
7.a)CREATE TABLE users
( id int PRIMARY KEY,
username VARCHAR(50),
age INT);

But in MongoDB:
db.createCollection("users");

7.b) Insert data:
INSRT INTO users(id,username,age)
VALAUES (1,"Nitin",21)

But in MongoDB:
db.users.insertOne({id:1,username:'Nitin',age:21});

7.c) Query Data
SELECT * FROM users WHERE age>21;

But in MOngoDB:
db.users.find({age:{$gt:21}});//particular(gt=greater than,lt=less than)
db.users.find()--all database

7.d) Update data
UPDATE users SET age=22 WHERE username='Nitin';

But in MongoDB
db.users.updateOne({username:'Nitin'},{ $set:{age:22}})--unique username that's why find according to it

7.d) Delete data
DELETE FROM users WHERE id=1;

But in MongoDB:
db.users.deleteOne({id:1});
*/



//Day-5( database connection between node js and mongoDB==mongoose)
/*
1. Connect MongoDB with NodeJs
2. Create a file db.js in the root folder
3. responsible for establishing a connection between your Node Js application and 
MongoDB server/database using Mongoose Library
*/

const express = require('express')
const app = express()//blueprint hai jisko app me store kar liye,app ke pass saara functionality available hai ab
const db = require('./db');
// const Person = require('./models/person');
// const MenuItem = require('./models/MenuItem');
//Body-Parser: Is a middleware library for Express-Js.
//It is used to parse and extract the body of incoming the HTTP requests
//This data can be in various formats such as JSON, form data, or URL-encoded data
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //parse json stores in req.body


app.get('/', function (req, res) { //req=request and res=response
    res.send('Welcome to our hotel!')
})

// app.post('/person', (req, res) => {
//     const data = req.body //Assuming the request body contains the person data
//     //Create a new Person document using the mongoose model
//     const newPerson = new Person(data);
//     // newPerson.name=data.name;
//     // newPerson.age=data.age;
//     // newPerson.mobile=data.mobile;
//     // newPerson.email=data.email;
//     // newPerson.address=data.address;
//     //Hectic to use the above method for getting user details, intead we directly pass to Person(data)



// //Save the new Person to the database
//  /*
// 1. Important Points
// • Async and Await

// • Nowadays no one uses callback functions like, we used in the POST methods They look quite complex and also do not give us code readability. 
// • What actually callback does, callback is a function that is executed just after the execution of another main function, 
// it means the callback will wait until its main function is not executed
// • Async and await are features in JavaScript that make it easier to work with asynchronous code, 
// such as network requests, file system operations, or database queries.
// • Using try and catch block
// • The "try" block contains the code for creating a new "Person" document
//  and saving it to the database using "await newPerson.save()".
// • If an error occurs during any step, it is caught in the "catch" block, 
// and an error response is sent with a 500 Internal Server Error status.
//     newPerson.save((error, savedPerson) => {
//         if (error) {
//             console.log("error saving person", error);
//             res.status(500).json({ error: "internal Server Error" })
//         }
//         else {
//             console.log("Data saved successfully");
//             res.status(200).json(savedPerson);
//         }
//     })
//     */

// })



//another way
/*
app.post('/person', async (req, res) => {
    try {
        const data = req.body
        //Create a new person document using the mongoose model
        const newPerson = new Person(data);
        //Save the new person to the database
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})
*/

//GET method to get the person
/*
app.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });

    }
})
*/
// Part-2

//POST method to for menuItem
/*
app.post('/menuItem', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log("Menu item saved");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})
*/

//GET method to get the menuItem
/*
app.get('/menuItem', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Menu Item Fetched");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
*/
//It is no possible and feasible to make every end-points based on work-type(like checf ka alag, waiter ka alag, manager ka alag) instead we
//use the method like ('/person/:workType')


/*
app.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType //Extract the work type from thr URL parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log("response fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Work type' })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
*/
//Problem keeps on increasing so now we use Express Router
/*
Express Router:
1. We have a lot of endpoints in a single file server.js
2. This makes bad experience in code readability as well as code handling
3. Expree router is a way to modularize and organize your route handling code in an Express.js application
4. So let's create a separate file to manage endpoints/person and /menu
5. Express Router is like a traffic cop for your web server
6. ERouter helps you organize and manage these pages or endpoints in your web application. It's like creating separate folders for different types of tasks

*/

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/person', personRoutes);
app.use('/menuItem', menuItemRoutes);


app.listen(2000, () => {
    console.log('listening on Port 2000')
})