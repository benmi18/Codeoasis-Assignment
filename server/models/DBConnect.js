const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://codeoasis:fnUwtX7MLauBVyd5@cluster0-fcibt.mongodb.net/codeoasis?retryWrites=true',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
  console.log('DB connected');
});

module.exports = mongoose;
