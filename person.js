const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('connected!')
    })
    .catch((err) => {
        console.log(err)
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName')
    .get(function () { // .fullName is now a property of any Person instance.
        return `${this.first} ${this.last}`
    })
    .set(function (v) { // `v` is the value being set
        const firstName = v.substring(0, v.indexOf(' '));
        const lastName = v.substring(v.indexOf(' ') + 1);
        this.set({ firstName, lastName });
    });

const Person = mongoose.model('Person', personSchema) // 'Person' model -> 'people' collection (lol)