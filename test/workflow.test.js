import { expect } from "chai";
import { BASE_URL } from "../utils/utils.js";
import request from "./setup.test.js";

describe("User workflow tests", () => {
  it("should register + login a user, create message and verify 1 in DB", (done) => {
    // 1) Register new user
    let user = {
      firstName: "Peter",
      lastName: "Petersen",
      username: "Peter",
      email: "mail@petersen.com",
      password: "7288arick",
    };
    request
      .post(BASE_URL + "/auth/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        request
          .post(BASE_URL + "/auth/login")
          .send({
            email: user.email,
            password: user.password,
          })
          .then((res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            let token = res.body.data.token;

            // 3) Create new message
            let message = {
              senderId: user.id,
              receiverId,
              message: "Salut",
              talkersIds: [ser.id, receiverId],
              createdAt: Date.now(),
            };

            request
              .post(BASE_URL + "/messages")
              .set({ "auth-token": token })
              .send(message)
              .then((res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                let savedProduct = res.body[0];
                expect(savedProduct.message).to.be.equal(message.message);
                expect(savedProduct.createdAt).to.be.equal(message.createdAt);
                expect(savedProduct.price).to.be.equal(message.price);
                expect(savedProduct.inStock).to.be.equal(message.inStock);

                // 4) Verify one message in test DB
                request
                  .get(BASE_URL + "/message")
                  .then((res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.be.eql(1);

                    done();
                  })
                  .catch((err) => {
                    done();
                    throw err;
                  });
              })
              .catch((err) => {
                done();
                throw err;
              });
          })
          .catch((err) => {
            done();
            throw err;
          });
      });
  });

  it("should register + login a user, create message and delete it from DB", (done) => {
    // 1) Register new user
    let user = {
      firstName: "Peter",
      lastName: "Petersen",
      username: "Peter",
      email: "mail@petersen.com",
      password: "7288arick",
    };
    request
      .post(BASE_URL + "/user/register")
      .send(user)
      .then((res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        request
          .post(BASE_URL + "/user/login")
          .send({
            email: "mail@petersen.com",
            password: "123456",
          })
          .then((res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            let token = res.body.data.token;

            // 3) Create new message
            let message = {
              senderId: user.id,
              receiverId,
              message: "Salut",
              talkersIds: [ser.id, receiverId],
              createdAt: Date.now(),
            };

            request
              .post(BASE_URL + "/message")
              .set({ "auth-token": token })
              .send(message)
              .then((res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                let savedProduct = res.body[0];
                expect(savedProduct.message).to.be.equal(message.message);
                expect(savedProduct.createdAt).to.be.equal(message.createdAt);
                expect(savedProduct.price).to.be.equal(message.price);
                expect(savedProduct.inStock).to.be.equal(message.inStock);

                // 4) Delete message
                request
                  .delete(BASE_URL + "/messages/" + savedProduct._id)
                  .set({ "auth-token": token })
                  .then((res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    const actualVal = res.body.message;
                    expect(actualVal).to.be.equal(
                      "Product was deleted successfully!"
                    );
                    done();
                  })
                  .catch((err) => {
                    done();
                    throw err;
                  });
              })
              .catch((err) => {
                done();
                throw err;
              });
          })
          .catch((err) => {
            done();
            throw err;
          });
      })
      .catch((err) => {
        done();
        throw err;
      });
  });

  it("should register user with invalid input", (done) => {
    // 1) Register new user with invalid inputs
    let user = {
      name: "Peter Petersen",
      email: "mail@petersen.com",
      password: "123", //Faulty password - Joi/validation should catch this...
    };
    request
      .post(BASE_URL + "/user/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(400); //normal expect with no custom output message
        //expect(res.status,"Status is not 400 (NOT FOUND)").to.be.equal(400); //custom output message at fail

        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(
          '"password" length must be at least 6 characters long'
        );
        done();
      });
  });
});
