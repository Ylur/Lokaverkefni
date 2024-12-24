// bakendi/models/Order.js
// klárt fyrir serverless
// TODO mögulega skoða að bæta við additional data ( price, description)

const mongoose = require('mongoose');

const SelectedDishSchema = new mongoose.Schema({
    idMeal: { type: String, required: true },
    strMeal: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const SelectedDrinkSchema = new mongoose.Schema({
    idDrink: { type: String, required: true },
    strDrink: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    date: { type: Date, default: Date.now },
    dishes: [SelectedDishSchema],
    drinks: [SelectedDrinkSchema],
    total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
