const request = require("supertest");
const app = require("../app");

let id;

// Test#5
test("GET / obtener todos los directores", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

// Test#6
test("POST / añadir director", async () => {
  const director = {
    firstName: "Christopher",
    lastName: "Nolan",
    nationality: "USA",
    image: "https://image.jpg",
    birthday: "1970-01-01",
  };
  const res = await request(app).post("/directors").send(director);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

// Test#7
test("PUT / actualizar director", async () => {
  const director = {
    firstName: "Chris",
  };
  const res = await request(app)
  .put("/directors/"+id)
  .send(director);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(director.firstName);
});

// Test#8
test('DELETE / eliminar director', async () => { 
  const res = await request(app).delete("/directors/"+id)
  expect(res.status).toBe(204);
})