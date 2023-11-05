const catchError = require('../utils/catchError');
const Movies = require('../models/Movies');
const Genres = require('../models/Genres');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');

const getAll = catchError(async(req, res) => {
    const results = await Movies.findAll({include: [ Genres, Actors, Directors ] });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movies.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.findByPk(id, {include: [ Genres, Actors, Directors ] });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movies.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// insertar los cursos del estudiante.
// 1.  Bucar el estudiante del id de la url.
// 2.  Setear los cursos del estudiante.
// 3.  Buscar los cursos seteados y retornar.

const setMoviesGenres = catchError(async(req, res) =>{
    const {id} = req.params;
    const movie = await Movies.findByPk(id);
    if(!movie) return res.status(404).json({ message: "Movie not found" });
    await movie.setGenres(req.body);
    const genre = await movie.getGenres();
    return res.json(genre);
}) ;

const setMoviesActors = catchError(async(req, res) =>{
    const {id} = req.params;
    const movie = await Movies.findByPk(id);
    if(!movie) return res.status(404).json({ message: "Movie not found" });
    await movie.setActors(req.body);
    const actor = await movie.getActors();
    return res.json(actor);
}) ;

const setMoviesDirectors = catchError(async(req, res) =>{
    const {id} = req.params;
    const movie = await Movies.findByPk(id);
    if(!movie) return res.status(404).json({ message: "Movie not found" });
    await movie.setDirectors(req.body);
    const director = await movie.getDirectors();
    return res.json(director);
}) ;

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMoviesGenres,
    setMoviesActors,
    setMoviesDirectors
}