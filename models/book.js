var mongoose = require('mongoose');
  
// book schema
var bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publisher:{
        type: String
    },
    pages:{
        type: String
    },
    img_url:{
        type: String
    },
    buy_url:{
        type: String
    },
    description:{
        type: String
    },
    price:{
        type:String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// get books
module.exports.getBooks = function(callback, limit){
    Book.find(callback).limit(limit);
}

// get book
module.exports.getBookById = function(id, callback){
    Book.findById(id, callback);
}

// add book
module.exports.addBook = function(book, callback){
    Book.create(book, callback);
}

// update book
module.exports.updateBook = function(id, book, options, callback){
    var query = {_id : id};
    var update = {
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        img_url: book.img_url,
        buy_url: book.buy_url,
        description: book.description,
        price: book.price
    }
    Book.findOneAndUpdate(query, update, options, callback);
}

// delete book
module.exports.removeBook = function(id, callback){
    var query = {_id: id};
    Book.remove(query, callback);
}

