const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");

Movies.belongsToMany( Genres, {through: "moviesGenres"});
Movies.belongsToMany( Actors, {through: "moviesActors"});
Movies.belongsToMany( Directors, {through: "moviesDirectors"});