const express = require('express');
const path = require('path');
const filmsList = require('./data/filmslist.json');
const filmPromo = require('./data/filmpromo.json');
const filmsAbout = require('./data/filmsabout.json');
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.static('images'));
app.use(express.json());
app.use(cors());

// Пример "заглушки" для статуса авторизации
let isAuthenticated = false;

app.get('/login', (req, res) => {
    // Возвращаем информацию о статусе авторизации
    res.json({ isAuthenticated });
});

app.get('/films', (req, res) => {
    // Отправляем список фильмов клиенту
    res.json(filmsList);
});

app.get('/films/:filmId', (req, res) => {
    const filmId = req.params.filmId;
    const film = filmsAbout.find(f => f.id === filmId);

    if (film) {
        res.json(film);
    } else {
        res.status(404).json({ error: 'Film not found' });
    }
});

app.get('/films/:filmId/similar', (req, res) => {
    const filmId = req.params.filmId;
    const filmGenre = filmsList.find(f => f.id === filmId).genre;

    const filmsSimilar = filmsList.map(f => {
        if(f.genre === filmGenre && filmId !== f.id) {
            return f;
        }
    })
    res.json(filmsSimilar);
})

app.get('/promo', (req, res) => {
    // Отправляем список фильмов клиенту
    res.json(filmPromo);
});

app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'images', imageName);

    res.sendFile(imagePath);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
