const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')

const imageUpload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});
const videoUpload = multer({
  dest: '../front-end/public/videos/',
  limits: {
    fileSize: 10000000
  }
});
const audioUpload = multer({
  dest: '../front-end/public/audio/',
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
const questionSchema = new mongoose.Schema({
  type: String,
  text: String,
  answer: String,
  path: String,
});
const categorySchema = new mongoose.Schema({
  name: String,
  questions: [String],
});
const boardSchema = new mongoose.Schema({
  name: String,
  categories: [String],
});

// Create a model for items in the museum.
const Question = mongoose.model('Question', questionSchema);
const Category = mongoose.model('Category', categorySchema);
const Board = mongoose.model('Board', boardSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/jeopardy', {
  useNewUrlParser: true
});

// Functions for storing uploads to the Server to be fetched later for each question
app.post('/api/photos', imageUpload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});
app.post('/api/videos', videoUpload.single('video'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/videos/" + req.file.filename
  });
});
app.post('/api/audio', audioUpload.single('audio'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/audio/" + req.file.filename
  });
});

// Create a new question to store within a category
app.post('/api/questions', async (req, res) => {
  const question = new Question({
    type: req.body.type,
    text: req.body.text,
    answer: req.body.answer,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(question);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Create a new category to store with a jeopardy board
app.post('/api/categories', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    questions: req.body.questions,
  });
  try {
    await item.save();
    res.send(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Create a new game to store with a jeopardy board
app.post('/api/boards', async (req, res) => {
  const board = new Board({
    name: req.body.name,
    categories: req.body.categories,
  });
  try {
    await item.save();
    res.send(board);
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

// --- This is Untouched ---
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
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.description = req.body.description;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));