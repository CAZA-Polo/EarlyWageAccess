require('dotenv').config();

const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const cors = require('cors');

// Define Routes

const testRoute = require('./route/testRoute');
const userRoute = require('./route/userRoute');
const customerRoute = require('./route/customerRoute');
const accountRoute = require('./route/accountRoute');
const onboardingRoute = require('./route/onboardingRoute');
const availmentRoute = require('./route/availmentRoute');
const paymentRoute = require('./route/paymentRoute');
const collectionRoute = require('./route/collectionRoute');
const reportsRoute = require('./route/reportsRoute');

// Must be at the top of every route call to use json format for requests
app.use(express.json());
app.use(cors());

const uri = process.env.DB_URI;

// Database Connection Here
app.listen(port, async () => {
    try {
        await mongoose.connect(uri)
        console.log(`Listening on port ${port} and connected to EWA_v1 database`);
    } catch(err) {
        console.log(err);
    }    
})

const apiV1Route = '/ewa/api/v1/';
app.use(apiV1Route, testRoute);
app.use(apiV1Route, customerRoute);
app.use(apiV1Route, userRoute);
app.use(apiV1Route, accountRoute);
app.use(apiV1Route, onboardingRoute);
app.use(apiV1Route, availmentRoute);
app.use(apiV1Route, paymentRoute);
app.use(apiV1Route, collectionRoute);
app.use(apiV1Route, reportsRoute);