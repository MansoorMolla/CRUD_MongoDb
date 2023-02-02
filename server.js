const express = require('express');
const app = express();
const joi = require('joi');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const collection = require("./db.js");
const exp = require('constants');



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


const port = process.env.PORT || 3000;



// To get Home Route
app.get('/', (req, res) => {
    res.send('Hello welcome to node js');
});



// To get all list of products all avilable
app.get('/products', (req, res) => {
    collection.find({}, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(data)
        }
    })
})



// GET A PARTICULAR ITEM BY ID VALUE
app.get('/products/:id', (req, res) => {
    const _id = req.params.id // Access the id provided
    collection.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})



// Used to post data to database
app.post('/addproduct', async (req, res) => {
    const data = {
        id: req.body.id,
        name: req.body.name
    }

    await collection.insertMany([data]);
    console.log("product added succesfully");
    res.send('product added successfully');
})


//USED TO UPDATE PARTICULER DATA BY ID
app.put('/update/:id', async (req, res) => {
    try {
        const user = await collection.findByIdAndUpdate(req.params.id, req.body)

        if (!user) {
            return res.status(404).send("Oops...Can't find any user with provided id")
        }
        collection.name = req.body.name;
        res.send("Updated user details :" + user)
    } catch (e) {
        res.status(400).send(e)
    }
});



//USED TO UPDATE PARTICULER FEILD DATA BY ID USING PATCH
app.patch('/update/:id', async (req, res) => {
    try {
        const user = await collection.findByIdAndUpdate(req.params.id, req.body)
        if (!user) {
            return res.status(404).send("Oops...Can't find any user with provided id to update")
        }
        collection.name = req.body.name;
        collection.id = req.body.id;
        res.send("Updated user details :" + user)
    } catch (e) {
        res.status(500).send()
    }
});



//USED TO DELETE PARTICULER DATA BY ID
app.delete('/delete/:id', async (req, res) => {
    try {
        const user = await collection.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send("Oops...Can't find any user with provided id to delete")
        }
        res.send("User data deleted")
    } catch (e) {
        res.status(500).send()
    }
});





app.listen(port, () => {
    console.log("server is running on port :" + port);
});