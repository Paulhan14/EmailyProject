const mongoose = require('mongoose');
const { Schema } = mongoose;
// Although mongoDB support different properties between different records in collections,
// For mongoose, we need to declare all the possible properties
// Each Schema maps to a MongoDB collections and defines the shape of the collection
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

// create a new collection called 'users'
mongoose.model('users', userSchema);
