const request = require("supertest");
const app = require("../server");

describe("Library API tests", () => {
  const testUser = {
    username: "testuser",
    email: `test${Date.now()}@mail.com`,
    password: "123456",
  };

  let token;

  test("POST /api/auth/register should create a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(testUser.email);

    token = res.body.token;
  });

  test("POST /api/auth/login should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });

  test("GET /api/books should return books array", async () => {
    const res = await request(app).get("/api/books");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/books should create a book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Book",
        author: "Test Author",
        description: "This is a test book.",
        image: "https://example.com/test.jpg",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.book.title).toBe("Test Book");
  });
});