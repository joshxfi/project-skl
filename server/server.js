const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');
app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!');
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use(morgan('tiny'));

app.listen(PORT);
