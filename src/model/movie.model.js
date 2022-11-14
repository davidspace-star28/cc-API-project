const knex = require('../knex');

const DISNEY_MOVIE_TABLE = 'disney_movie';

module.exports = {
  DISNEY_MOVIE_TABLE,

  /**
   * Get all orders.
   * @param {number} limit - The max number of records to return.
   * @return {Promise<Array>} A promise that resolves to an array of orders.
   */
  getAll(limit = 10) {
    return knex
      .select({
        id: 'id',
        movie_title: 'movie_title',
        release_date: 'release_date',
        hero: 'hero',
        villan: 'villan',
        song: 'song',
      })
      .from(DISNEY_MOVIE_TABLE)
      .limit(limit);
  },

  create(movie) {
    return new Promise((resolve, _) => {
      knex(DISNEY_MOVIE_TABLE)
        .insert(movie)
        .returning('id')
        .then((res) => {
          resolve(res[0].id);
        });
    });
  },

  remove(id) {
    return new Promise((resolve) => {
      knex(DISNEY_MOVIE_TABLE)
        .where('id', '=', id)
        .del()
        .then((res) => {
          resolve(res);
        });
    });
  },

  update(id, movie) {
    return new Promise((resolve, _) => {
      knex(DISNEY_MOVIE_TABLE)
        .where('id', '=', id)
        .update(movie)
        .returning('id')
        .then((res) => {
          resolve(res[0].id);
        });
    });
  },
  //   },

  //   /**
  //    * Get a single order by id.
  //    * @param {number} id - The order's id.
  //    * @return {Promise<Object>} A promise that resolves to the order that matches the id.
  //    */
  //   getById(id) {
  //     return new Promise((resolve, _) => {
  //       knex
  //         .select({
  //           id: "id",
  //           customerId: "customer_id",
  //           datePlaced: "date_placed",
  //           dateShipped: "date_shipped"
  //         })
  //         .from(ORDER_TABLE)
  //         .where("id", "=", id)
  //         .first()
  //         .then(res => {
  //           const order = res;
  //           resolve({order});
  //         });
  //     });
  //   },

  //   /**
  //    * Create a new order.
  //    * @param {Object} order - The new order data to add.
  //    * @return {Promise<number>} A promise that resolves to the order that was created.
  //    */

  //   /**
  //    * Update an existing order.
  //    * @param {number} id - The unique id of the existing order.
  //    * @param {Object} order - The order data to change.
  //    * @return {Promise<number>} A promise that resolves to the id of the updated order
  //    */
  //   update(id, order) {
  //     validateProps(order);

  //     return new Promise((resolve, _) => {
  //       knex(ORDER_TABLE)
  //         .where("id", "=", id)
  //         .update(order)
  //         .returning("id")
  //         .then(res => {
  //           resolve(res[0].id);
  //         });
  //     });
  //   },

  //   /**
  //    * Remove an existing order.
  //    * @param {number} id - The unique id of the existing order.
  //    * @return {Promise<number>} The id of the deleted order.
  //    */
  //   remove(id) {
  //     knex(ORDER_TABLE)
  //     .where("id", "=", id)
  //     .del();
  //   }
};
