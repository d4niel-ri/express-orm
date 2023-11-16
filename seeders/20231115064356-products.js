'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Products', [
      {
        name: "Ember Bagus",
        description: "Wadah berbentuk silinder",
        price: "65000",
        quantity_in_stock: 20,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sapu Nagata",
        description: "Alat untuk bersih-bersih rumah",
        price: 55000,
        quantity_in_stock: 10,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sapu Scotch Brite",
        description: "Alat untuk bersih-bersih",
        price: 70000,
        quantity_in_stock: 10,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
