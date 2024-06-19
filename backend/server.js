const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
// or as an es module:
// import { MongoClient } from 'mongodb'
dotenv.config()
// Connection URL
const url = "mongodb+srv://darshbothra007:passpro123@cluster0.3quqqse.mongodb.net";
const client = new MongoClient(url);
// Database Name
const dbName = 'passpro';
const app = express()
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
const port = 3000
app.use(bodyParser)
client.connect();

// to get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('documents')
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// save a password
app.post('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('documents')
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// delete the password

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})