const express = require('express');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitize = require('mongo-sanitize');

const loadTestData = require('./testData');

const app = express();

// import routes
const postRoutes = require('./routes/post.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', postRoutes);
app.use(helmet());
app.use(mongoSanitize());

// connect our back end code with the database
mongoose.connect(config.DB, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => console.log('Connected to the database'));
loadTestData();
db.on('error', err => console.log('Error ' + err));

app.listen(config.PORT, () => {
   console.log('Server is running on port: ', config.PORT);
});
