const request = require("supertest");
const app = require("../app");
const Genres = require("../models/Genres");
const Actors = require("../models/Actors");
const Directors = require("../models/Directors");
require("../models");

let id;

// Test#13
test("GET / obtener todas las peliculas de la API", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
});

// Test#14
test("POST / crear peliculas", async () => {
  const movie = {
    name: "Triangulo",
    image: "https://image.jpg",
    synopsis: "Pelicula rara muy psicologica",
    releaseYear: "2009",
  };
  const res = await request(app).post("/movies").send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(movie.name);
  expect(res.body.id).toBeDefined();
});

// Test#15
test("PUT / actualizar peliculas", async () => {
  const movie = {
    name: "Mr nobody",
  };
  const res = await request(app)
  .put("/movies/" + id)
  .send(movie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

// Test#16
test("POST / movies/:id/genres", async () => {
  const genre = await Genres.create({
    name: "accion",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

// Test#17
test("POST / movies/:id/actors", async () => {
  const actor = await Actors.create({
    firstName: "keanu",
    lastName: "Reeves",
    nationality: "USA",
    image: "https://image.jpg",
    birthday: "1964-09-02",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

// Test#18
test("POST / movies/:id/directors", async () => {
  const director = await Directors.create({
    firstName: "Christopher",
    lastName: "Nolan",
    nationality: "USA",
    image: "https://image.jpg",
    birthday: "1970-01-01",
  });
  const res = await request(app)
  .post(`/movies/${id}/directors`)
  .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

// Test#19
test("DELETE / eliminar peliculas", async () => {
  const res = await request(app).delete("/movies/" + id);
  expect(res.status).toBe(204);
});
