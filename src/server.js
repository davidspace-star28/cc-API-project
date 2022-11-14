const express = require('express');
const knex = require('./knex');
const movieModel = require('./model/movie.model');

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get('/movies', async (req, res) => {
    const ret = await movieModel.getAll(10);
    res.status(200).json(ret).end();
  });

  app.post('/movies', async (req, res) => {
    const id = await movieModel.create(req.body);
    res.status(201).json(id).end();
  });

  app.delete('/movies/:id', async (req, res) => {
    await movieModel.remove(req.params.id);
    return res.status(204).end();
  });

  app.patch('/movies/:id', async (req, res) => {
    await movieModel.update(req.params.id, req.body);
    return res.status(200).end();
  });

  return app;
};

module.exports = { setupServer };
