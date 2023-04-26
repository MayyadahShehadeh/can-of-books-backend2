'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const mongoLink = process.env.MONGO_LINK;

mongoose.connect(mongoLink, {
  useNewUrlParser: true
});
const {getBookHandler,
  addBooksHandler,
  deleteBooks,
  updateBooksHandler} = require('./modules/crudFunctions')






app.get('/test', (request, response) => {
  response.send('test request received')
})


// ROUTES
// http://localhost:3000/book?personEmail=miss.mayadah5gmsil.com
app.get('/book', getBookHandler);
app.post('/addBook', addBooksHandler);
app.delete('/deleteBook/:bookId', deleteBooks);
app.put('/updateBook/:bookID', updateBooksHandler);



app.listen(PORT, () => console.log(`listening on ${PORT}`));
