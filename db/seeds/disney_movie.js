/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('disney_movie').del();
  await knex('disney_movie').insert([
    {
      id: 1,
      movie_title: 'Aladdin',
      release_date: '1992-11-25',
      hero: 'Aladdin',
      villan: 'Jafar',
      song: 'A Whole New World',
    },
    {
      id: 2,
      movie_title: 'Peter Pan',
      release_date: '1953-02-05',
      hero: 'Peter Pan',
      villan: 'Captain Hook',
      song: 'You Can Fly!',
    },
  ]);
};
