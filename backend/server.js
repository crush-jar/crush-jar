const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const uri = 'mongodb+srv://MongoAdmin:kayak123@cluster0.0crvsol.mongodb.net/mentions?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((conn) => {console.log("Connection successful!")})
  .catch((error) => {console.log("OH NO!")});

// Define the schema for the "Item" model
const itemSchema = new mongoose.Schema({
  name: String,
});

// Define a Mongoose model
const Mentions = mongoose.model('Mentions', itemSchema, "Mentions");

// Create a route to get items
app.get('/api/mentions', async (req, res) => {
  const items = await Mentions.find({});
  console.log(`The items are: ${items}`)
  res.json(items);
});

app.post('/api/mentions', async (req, res) => {
  const items = await Mentions.create({name: "Daphne"});
  res.json(items);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
