const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        
    },
    answer: {
        type: String,
        required: true,
        
    },

    role: {
        type: Number,
        default: 0,
    }

}, {timestamps:true})


userSchema.virtual('incomes', {
    ref: 'Income',
    localField: '_id',
    foreignField: 'user'
  });
  
  userSchema.virtual('expense', {
    ref: 'expense',
    localField: '_id',
    foreignField: 'user'
  });

  // Virtual field for expenses
  userSchema.virtual('budget', {
    ref: 'budget',
    localField: '_id',
    foreignField: 'user'
  });

module.exports=mongoose.model('users', userSchema)