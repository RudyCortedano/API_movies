const request = require("supertest");
const app = require("../app");

let id;

// Test#1
test("GET / obtener todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

// Test#2
test("POST / añadir actor", async () => {
  const actor = {
    firstName: "Tom",
    lastName: "Handleston",
    nationality: "USA",
    image: "https://image.jpg",
    birthday: "1985-01-01",
  };
  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(actor.firstName);
  expect(res.body.id).toBeDefined();
});

// Test#3
test("PUT / actualizar actor", async () => {
  const actor = {
    firstName: "Keanu",
  };
  const res = await request(app).put(`/actors/${id}`).send(actor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(actor.firstName);
});

// Test#4
test("DELETE / eliminar actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
