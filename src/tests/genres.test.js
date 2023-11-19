const request = require("supertest");
const app = require("../app");

let id;

// Test#9
test("GET / obtener todos los generos", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

// Test#10
test("POST /  crear genero", async () => {
  const genre = {
    name: "misterio",
  };
  const res = await request(app).post("/genres").send(genre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(genre.name);
  expect(res.body.id).toBeDefined();
});

// Test#11
test("PUT / Actualizar genero", async () => {
  const genre = {
    name: "terror",
  };
  const res = await request(app)
  .put("/genres/" + id)
  .send(genre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genre.name);
});

// Test#12
test("DELETE / eliminar genero", async () => {
  const res = await request(app).delete("/genres/" + id);
  expect(res.status).toBe(204);
});
