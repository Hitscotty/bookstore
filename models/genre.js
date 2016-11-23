var mongoose = require('mongoose');


// genre schema
var genreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        default: Date.now
    }
});
var Genre = module.exports = mongoose.model('Genre', genreSchema);

// add genre
module.exports.addGenre = function(genre, callback){
    Genre.create(genre, callback);
}
