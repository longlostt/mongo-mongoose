const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('connected!')
    })
    .catch((err) => {
        console.log(err)
    });

const productSchema = new mongoose.Schema({ // 1. Make a schema
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        min: 0 
    }, 
    onSale: {
        type: Boolean,
        default: false
    }, 
    categories: {
        type: [String],
        default: ['Cycling']
    },
    qty:{
        online: {
            type: Number,
            default: 0
        },
        inPerson: {
            type: Number,
            default: 0
        }
    }

})

const Product = mongoose.model('Product', productSchema); // 2. Make a model using said schema (Product -> products(collection))

const bike = new Product({name: 'Tire Pump', price: 19.50, categories: ['Cycling' /*123 will turn it into '123'*/]}) // 3. Use the model to make an actual Product

bike.save() // 4. Save it to db
    .then(data => {
        console.log('It worked')
        console.log(data)
    })
    .catch(err => {
        console.log(err) // .errors.properties.name.message
    })