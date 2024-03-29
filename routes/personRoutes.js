const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//Note: person is common in all three routes and hence we delete it from here and put it inside the server.js file ke app.use wale (./person) me
//POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

//GET method to get the Menu Items
router.get('/', async (req, res) => {
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




router.get('/:workType', async (req, res) => {
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


//Update Operation

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;//Extract the person's id from the url parameter
        const updatedPersonData = req.body;//Updated the data of a person
        //Case1- Data updated mil gya, case2- Fail ho gya to cactch block, case3- no valid id or no document found wih that id/object_id/_id
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true,//Run mongoose validation
        })
        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        }
        console.log("Data updated");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//Delete operation

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log('Data deleted');
        res.status(200).json({ message: "Person data deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router;