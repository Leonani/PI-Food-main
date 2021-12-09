const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
  });

  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('Deberia retornar error si le paso null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Deberia trabajar bien si le paso un nombre', () => {
        Recipe.create({ name: 'Pikachu' });
      });
    });
  });
  
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('name', () => {
      it('Deberia retornar error si le paso null', (done) => {
        typeDiets.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Deberia trabajar bien si le paso un nombre', () => {
        typeDiets.create({ name: 'vegan' });
      });
    });
  });
  
});



