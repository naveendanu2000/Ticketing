import request from "supertest";
import { app } from "../../app";

it("Responds with details about the current user", async () => {
  const cookie = await global.signin();

  if (!cookie) {
    throw new Error("Cookie not set after signup");
  }

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("Responds with not Authorized when the user is not logged in", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
