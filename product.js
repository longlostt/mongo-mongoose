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
        maxlength: [20, '20 CHAR MAX!']
    },
    price: {
        type: Number,
        min: [0, 'PRICE AT LEAST 0']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        default: ['Cycling']
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inPerson: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['XS','S','M','L','XL','XXL'] // size can only be one of these
    }
})

productSchema.methods.greet = function() { // use traditional func for this. not arrow.
    console.log(`howdy\n- from ${this.name}`)     
}

productSchema.methods.toggleOnSale = function() { // use traditional func for this. not arrow.
    this.onSale = !this.onSale;
    return this.save()     // .save() takes time, so we return a promise and then await it
}

productSchema.methods.addCategory = function(newCat){
    this.categories.push(newCat)
    return this.save()    // .save() on method that update/create data
}

productSchema.statics.fireSale = function(){
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema); // 2. Make a model using said schema (Product -> products (collection) )

// const findProduct = async () => {
//     const foundProduct = await Product.findOne({name: 'Mountain Bike'})
//     console.log(foundProduct)
//     await foundProduct.toggleOnSale(); // await the promise 
//     await foundProduct.addCategory('Outdoors')
//     console.log(foundProduct)
// }
Product.fireSale()
    .then(data => {
        console.log(data)
    })
// findProduct()


// const bike = new Product({name: 'Cycling Jersey', price: 29.50, categories: ['Cycling' /*123 will turn it into "123" */], size: 'H'}) // 3. Use the model to make an actual Product
// bike.save() // 4. Save it to db
//     .then(data => {
//         console.log('It worked')
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(err) // .errors.properties.name.message
//     })

// Product.findOneAndUpdate({name:'Tire Pump'}, {price: -10.99}, {new: true, runValidators: true /* <- false by default. Applies schema validators when true*/}) // "new: true" - shows new data in console, when updated.
//     .then(data => {
//         console.log('It worked')
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(err) // .errors.properties.name.message
//     })

