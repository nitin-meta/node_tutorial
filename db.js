//Steps defined for connecting mongoDB and Node Js
const mongoose = require("mongoose");

//define the MongoDB connection url
const mongoURL = 'mongodb://localhost:27017/hotels' //replace hotels with your database name

//Set up mongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,//both are mandatory to use else give some error at some case
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;// This object is used to handle events and interact with the database

//Define event listeners(like .on('connected',...),.on('error',...) and 
//.on('disconnected',...)) for example below

db.on('connected', () => {
    console.log('connected to MongoDB server');
});

db.on('error', () => {
    console.log('MongoDB connection error', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

//Exports the database connection

module.exports = db