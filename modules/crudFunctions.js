

const {bookModel} = require('../controller/bookSchema')

// --------------- to get all books from db ---------------
function getBookHandler(req, res) {
    let personEmail = req.query.userEmail;
  
    bookModel.find({ userEmail: personEmail }).then(data => {
      console.log(data);
      res.send(data)
  
    })
  }

// ---------- to add new book -----------------
async function addBooksHandler(req, res) {
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

// ------------------------ to delete book from db ----------------
function deleteBooks(req, res) {
    console.log(req.params);
    let bookID = req.params.bookId;
    let userEmail = req.query.userEmail;
  
    bookModel.findOneAndDelete({ _id: bookID }).then(() => {
  
      bookModel.find({ userEmail }).then(data => {
        console.log(data);
        res.send(data)
      })
    })
  }


// --------------- to update book information --------


function updateBooksHandler(req, res) {
    let { userEmail, bookName, description } = req.body;
  
    let bookID = req.params.bookID;
  
    bookModel.findOne({ _id: bookID }).then(data => {
      data.userEmail = userEmail;
      data.bookName = bookName;
      data.description = description;
      console.log(data);
  
      data.save().then(()=> {
        bookModel.find({ userEmail }).then(data => {
          console.log(data);
          res.send(data)
        })
      }).catch(error =>{
        console.log(error);
      })
      })
  }

  module.exports = {getBookHandler,
    addBooksHandler,
    deleteBooks,
    updateBooksHandler}