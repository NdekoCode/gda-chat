process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app.js";
import MessageMDL from "../models/MessageMDL.js";
import UserMDL from "../models/UserMDL.js";
chai.use(chaiHttp);
//clean up the database before and after each test
beforeEach((done) => {
  MessageMDL.deleteMany({}, function (err) {});
  UserMDL.deleteMany({}, function (err) {});
  done();
});
afterEach((done) => {
  MessageMDL.deleteMany({}, function (err) {});
  UserMDL.deleteMany({}, function (err) {});
  done();
});

const request = chai.request(server).keepOpen();
export default request;
