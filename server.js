const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
const port = process.env.PORT || 3001;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('connection is established successfully!');
});
// console.log(app.get('env'));  //gets us the current environment

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
