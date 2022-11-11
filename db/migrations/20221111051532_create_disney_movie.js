/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('disney_movie', function (table) {
    table.increments('id').primary();
    table.string('movie_title', 128).unique().notNullable();
    table.date('release_date', 16).notNullable();
    table.string('hero', 64);
    table.string('villan', 64);
    table.string('song', 128);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('disney_movie');
};
