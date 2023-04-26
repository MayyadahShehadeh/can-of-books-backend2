const mongoose = require('mongoose');

// schema
const bookSchema = new mongoose.Schema({
    userEmail: String,
    bookName: String,
    description: String,
    status: String
})

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
//   seedBooksFunction();

  module.exports={bookModel,
    seedBooksFunction}

