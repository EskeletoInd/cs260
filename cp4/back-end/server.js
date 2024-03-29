const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/swap', {
  useNewUrlParser: true
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    path: req.body.path,
  });
  try {
    await item.save();
    let items = await Item.find();
    res.send(items[Math.floor(Math.random() * Math.floor(items.length))].path);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  console.log("Put Called")
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.path = req.body.path;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

async function clear() {
  try {
    await Item.deleteMany({});
    console.log(await Item.find());
  } catch (error) {
    console.log(error);
  }
}

app.listen(3001, () => console.log('Server listening on port 3001!'));

//clear();