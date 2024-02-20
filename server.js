require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const mongoURI = process.env.DATABASE_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB :)');
  })
  .catch((error) => {
    console.error('Couldnt connect to MongoDB :(', error);
  });


const routes = require('./routes');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', routes);

app.get('/ping', (req, res) => {
  res.send("pong");
});

app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.send(`Database Status: ${dbStatus}`);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
