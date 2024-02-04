const express = require('express');
const cors = require("cors");
const serverless = require('serverless-http');
const router = express.Router();
const authRoutes = require('../routes/authRoutes');
const filmsRoutes = require('../routes/filmsRoutes');
const imagesRoutes = require('../routes/imagesRoutes');
const favoriteRoutes = require('../routes/favoriteRoutes');
const commentsRoutes = require('../routes/commentsRoutes');

const app = express();

app.use(express.static('images'));
app.use(express.json());
app.use(cors());

app.use('/.netlify/functions/server/login', authRoutes);
app.use('/.netlify/functions/server/films', filmsRoutes);
app.use('/.netlify/functions/server/images', imagesRoutes);
app.use('/.netlify/functions/server/comments', commentsRoutes);
app.use('/.netlify/functions/server/favorite', favoriteRoutes);

app.use('/.netlify/functions/server', router);
module.exports.handler = serverless(app);
