const chai = require('chai');
const chaiHttp = require('chai-http');
const { setupServer } = require('../src/server');
const config = require('../knexfile');
const knex = require('knex')(config);
const movieModel = require('../src/model/movie.model');
const DISNEY_MOVIE_TABLE = movieModel.DISNEY_MOVIE_TABLE;
chai.use(chaiHttp);
chai.should();

describe('movie', () => {
  let request;
  const testId = 100000;
  beforeEach(() => {
    const server = setupServer();
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    request.close();
  });

  describe('GET /movies', () => {
    it('should return an array of movies', async () => {
      const res = await request.get('/movies');
      res.should.have.status(200);
      res.body.should.to.deep.equal([
        {
          id: 1,
          movie_title: 'Aladdin',
          release_date: '1992-11-24T15:00:00.000Z',
          hero: 'Aladdin',
          villan: 'Jafar',
          song: 'A Whole New World',
        },
        {
          id: 2,
          movie_title: 'Peter Pan',
          release_date: '1953-02-04T15:00:00.000Z',
          hero: 'Peter Pan',
          villan: 'Captain Hook',
          song: 'You Can Fly!',
        },
      ]);
    });
  });
  describe('POST /movies', () => {
    after(async () => {
      await knex
        .from(DISNEY_MOVIE_TABLE)
        .where('id', testId)
        .del()
        .catch(console.error);
    });
    it('should insert a record of movie', async () => {
      const res = await request.post('/movies').send({
        id: testId,
        movie_title: 'hogehogemovie',
        release_date: '1900-01-02T15:00:00.000Z',
        hero: 'hogehero!',
        villan: 'hogevillan!',
        song: 'hogesong!',
      });
      res.should.have.status(201);
      res.body.should.to.be.equal(100000);
    });
  });

  describe('DELETE /movies', () => {
    before(async () => {
      await knex
        .insert({
          id: testId,
          movie_title: 'hogehogemovie',
          release_date: '1900-01-02T15:00:00.000Z',
        })
        .into(DISNEY_MOVIE_TABLE)
        .returning('id');
    });

    it('should delete a record', async () => {
      const res = await request.delete(`/movies/${testId}`);
      res.should.have.status(204);
    });
  });

  describe('PATCH /movies', () => {
    before(async () => {
      await knex
        .insert({
          id: testId,
          movie_title: 'hogehogemovie',
          release_date: '1900-01-02T15:00:00.000Z',
        })
        .into(DISNEY_MOVIE_TABLE)
        .returning('id');
    });

    after(async () => {
      await knex(DISNEY_MOVIE_TABLE)
        .where('id', testId)
        .returning('id')
        .del()
        .then((result) => {
          console.log('removed test movie');
        })
        .catch(console.error);
    });

    it('should update a record with a certain id', async () => {
      const res = await request
        .patch(`/movies/${testId}`)
        .send({ movie_title: 'hogehogemovie2' });
      res.should.have.status(200);
    });
  });
});
