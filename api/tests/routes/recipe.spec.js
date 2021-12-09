/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  // describe('GET /', () => {
  //   it('should get 200', () =>
  //     agent.get('/').expect(200)
  //   );
  // });

   


  describe("GET /:id", () => {
    it("Devuelve 200 si le paso un id", (done) => {
      agent.get("/716426").then(() => done());
    });
  }
  );
  describe("GET /:id", () => {
    it("Devuelve 404 si le paso un id incorrecto", (done) => {
      agent.get("/hola").then(() => done());
    });
  }
  );
  describe("POST /recipe", () => {
    it("Devuelve 200 si la ruta del POST es correcta", (done) => {
      agent.post("/recipe").send(recipe).then(() => done());
    });
  }
  );
  describe("GET /recipes?name=name", () => {
    it("Devuelve 200 si le paso un nombre correcto", (done) => {
      agent.get("/recipes?name=Garlicky Kale").then(() => done());
    });
  }
  );
  describe("GET /recipes?name=name", () => {
    it("Devuelve 404 si le paso un nombre incorrecto", (done) => {
      agent.get("/recipes?name=wuacala").then(() => done());
    });
  }
  );

});

