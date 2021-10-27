import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: String,
    name: String,
    address: Object,
    status: String,
    amount: {
        subtotal: Number,
        discount: Number,
        shipping: Number,
        tax: Number,
        total: Number,
    },
    itemsImg: [String],
    orderDate: Date,
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orders: [orderSchema],
});

export default mongoose.models.User || mongoose.model('User', userSchema);