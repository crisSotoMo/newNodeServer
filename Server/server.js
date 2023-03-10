const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

let movies = [
    {id: uuidv4(), title: 'El Laberinto del Fauno', year: 2006, director: 'Guillermo del Toro', genre: 'Drama, Fantasía'},
    {id: uuidv4(), title: 'The Two Towers', year: 2002, director: 'Peter Jackson', genre: 'Acción, Fantasía'},
    {id: uuidv4(), title: 'The Silence of the Lambs', year: 1991, director: ' Jonathan Demme', genre: 'Triller psicológico, Terror'}
];

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

app.post('/movies', (req, res) => {
    const movie = req.body;
    if (!movie.title || !movie.director || !movie.genre || !movie.year) {
        return res.status(400).json({error: 'Missing required fields'});
    }
    movie.id = uuidv4();
    movies.push(movie);
    res.json(movie);
});

app.put('/movies/:id', async (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = req.body;
    try {
        const movie = await movies.find(movie => movie.id);
        if (!movie) {
            return res.status(404).send('Resource not found');
        }
        await movie.update(data);
        res.status(200).send('Movie was updated');
    } catch (error) {
        res.status(500).send('Movie was not updated');
    }
});

app.delete('/movies/:id', async (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = req.body;
    try {
        const movie = await movies.find(movie => movie.id);
        if (!movie) {
            return res.status(404).send('Resource not found');
        }
        await movie.destroy(data);
        res.status(200).send('Movie was deleted');
    } catch (error) {
        res.status(500).send('Movie was not deleted');
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    
});