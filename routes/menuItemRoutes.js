const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

//POST routes to for menuItem

router.post('/', async (req, res) => {
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

//GET method to get the menuItem

router.get('/', async (req, res) => {
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

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType //Extract the taste type from thr URL parameter
        if (tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet') {
            const response = await MenuItem.find({ taste: tasteType });
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

module.exports = router;