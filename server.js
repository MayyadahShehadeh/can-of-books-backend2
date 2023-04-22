'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
app.use(cors());

const PORT = process.env.PORT;
const mongoLink = process.env.MONGO_LINK;

mongoose.connect(mongoLink, {
  useNewUrlParser: true
});
// schema
const bookSchema = new mongoose.Schema({
  userEmail: String,
  bookName: String,
  description: String,
  status: String
});

// collection
const bookModel = mongoose.model('bookData', bookSchema);

// add data to that collection
function seedBooksFunction() {
  const book1 = new bookModel({
    userEmail: 'miss.mayadah5@gmail.com',
    bookName: 'book1',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
    status: 'draft'
  });
  const book2 = new bookModel({
    userEmail: 'miss.mayadah5@gmail.com',
    bookName: 'book2',
    description: 'Aliquam tincidunt mauris eu risus.',
    status: 'draft'
  });
  const book3 = new bookModel({
    userEmail: 'miss.mayadah5@gmail.com',
    bookName: 'book3',
    description: 'Vestibulum auctor dapibus neque.',
    status: 'draft'
  });

  book1.save();
  book2.save();
  book3.save();

}
seedBooksFunction();

app.get('/test', (request, response) => {
  response.send('test request received')
})

// http://localhost:3000/book?personEmail=miss.mayadah5gmsil.com
app.get('/book', getBooksHandler);

function getBooksHandler (req,res){
  let personEmail = req.query.userEmail;

  bookModel.find({ userEmail: personEmail }).then(data => {
    console.log(data);
    res.send(data)
  
  })
  

}
app.listen(PORT, () => console.log(`listening on ${PORT}`));
