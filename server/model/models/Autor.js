const mongoose = require('../connectDB');
var Schema = mongoose.Schema;

const AutorSchema = new Schema({
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    dafault: Date.now
  }
});

module.exports = mongoose.model('Autor', AutorSchema);
