const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/biblioteca' , { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, '>>> Error connection in MongoDB:'));
db.once('open', () => {
  console.log('>>> Connect MongoDB.')
});

module.exports = mongoose;