const mongoose = require('mongoose');

const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!💥');
  console.log(err.name, err.message);
  process.exit(1);
});

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

const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!💥');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
  //o SUCCESS WITHOUT ERROR, 1 SHUTTING DOWN BECAUSE OF ERROR
});
