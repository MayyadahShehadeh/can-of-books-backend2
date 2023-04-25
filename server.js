'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

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
app.post('/addBook', addBookHandler);
app.delete('/deleteBook/:bookId', deleteBook);


function getBooksHandler(req, res) {
  let personEmail = req.query.userEmail;

  bookModel.find({ userEmail: personEmail }).then(data => {
    console.log(data);
    res.send(data)

  })


}

async function addBookHandler(req, res) {
  console.log(req.body);

  let { userEmail, bookName, bookDescription } = req.body;

  const newBook = new bookModel({
    userEmail: userEmail,
    bookName: bookName,
    description: bookDescription
  })
  await newBook.save();

  bookModel.find({ userEmail: userEmail }).then(data => {
    console.log(data);
    res.send(data)

  })
}

function deleteBook(req, res) {
  console.log(req.params);
  let bookID = req.params.bookId;
  let userEmail = req.query.userEmail;

  bookModel.findOneAndDelete({ _id: bookID }).then(()=>{

    bookModel.find({ userEmail }).then(data =>{
      console.log(data);
      res.send(data)
    })
    
  }


  
    
  )

}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
