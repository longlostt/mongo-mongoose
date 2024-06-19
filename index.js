const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/moviesApp')
    .then(() => {
        console.log('connected!')
    })
    .catch((err) => {
        console.log(err)
    });
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema) // first arg has to be: 1. Capitalized 2. Single.  Movie --> movies(collection)
// const Baby = new Movie({title: "Sexy Baby", year: 1995, score: 10, rating: "R"}) // need to Baby.save later, to save to db. method like insertMany() does NOT require .save() 