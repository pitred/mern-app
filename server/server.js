const express = require('express');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const helmet = require('helmet');
const loadTestData = require('./testData');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
const path = require('path');

// import routes
const postRoutes = require('./routes/post.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', postRoutes);
app.use(helmet());
app.use(mongoSanitize());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

// connect our back end code with the database
mongoose.connect(config.DB, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => console.log('Connected to the database'));
loadTestData();
db.on('error', err => console.log('Error ' + err));

app.listen(config.PORT, () => {
   console.log('Server is running on port: ', config.PORT);
});
console.log(process.env.DB);
