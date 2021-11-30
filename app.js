const express = require('express');
const app = express(); //like a function
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('../api/routes/products');
const orderRoutes = require('../api/routes/orders');
const userRoutes = require('../api/routes/users');


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://BelleUng:<password>@node-rest-shop.rqqwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


mongoose.connect(
    "mongodb+srv://BelleUng:" + 
    process.env.MONGO_ATLAS_PW + 
    "@node-rest-shop.rqqwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{
    useMongoClient: true
}
);
mongoose.Promnise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //make it easily readable

app.use((req, res, next) => {
    res.header('Access-Control_Allow_Origin', '*'); // * means to give access to any orgin
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // ALL THE HTTP REQUESTS THAT WANT TO SUPPORT API
            return res.status(200).json({});
        }
        next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//this is just for testing
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!!'
//     });
// });

module.exports = app;