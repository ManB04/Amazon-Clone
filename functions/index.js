const functions = require('firebase-functions');
const express=require("express");
const cors=require("cors");
const stripe = require("stripe")('sk_test_51HVzooHVh6etyJysYIwz6borHR8trBBx1CzjL3dMLiZPkrIjJZOrDEJe1SSi6DfJg5NY5MvGtTMCxMQwyHAkEwX4000qBSsusV')

// To set up an API following things are need to be setup:
// i. App config
// ii. Middlewares
// iii. API routes
// iv. Listen command
// below setup needed for getting backened express app running on cloud 

// i. App config
const app=express();

// ii. Middlewares
app.use(cors({origin: true})); // cors in this case can be interpreted as used for security
app.use(express.json());  // we are sending our details by converting it to a json object

// iii. API routes
// '/' default endpoint
//example endpoint
// http://localhost:5001/clone-83c93/us-central1/api- the complete url for default endpoint
app.get('/',(request,response) => response.status(200).send('hello world')) // we use the response status as 'hello world' to check if our baseURL api is working properly or not
// we can check this by adding /viking to default endpoint - http://localhost:5001/clone-83c93/us-central1/api/viking
// app.get('/viking',(request,response) => response.status(200).send('Always a Viking!'))

// we are making a post request now
// here we are making post request to useEffect() in Payment.js
app.post('/payments/create', async(request,response) => {
    // this is for query param ?total in Payment.js, we are storing it in const total in form of subunits ie. cents/paise etc
    const total=request.query.total;
    console.log('Payment Request Received for this amount >>> ',total)

    // submitting payment to stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total, // const total is in subunits
        currency:"usd" //currency of the const total
    });

    // to check if status is Ok i.e created we use 201
    // to see client information we use clientSecret
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// iv. Listen command
exports.api = functions.https.onRequest(app)

