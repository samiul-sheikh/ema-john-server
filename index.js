const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uohe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 8080;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productsCollection = client.db("emaJohnStore").collection("products");
    console.log("database connected");

    app.post('/addProduct', (req, res) => {
        const product = req.body;
        productsCollection.insertOne(product)
            .then(result => {
                console.log(result);
            })
    })
});

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)

app.get('/', (req, res) => {
    res.send('welcome to ema-john server!')
})

app.listen(port)