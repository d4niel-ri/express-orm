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
    return queryInterface.bulkInsert('Suppliers', [
    {
      supplier_name: "Nagata",
      contact_phone: "0266224592",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      supplier_name: "Bolde",
      contact_phone: "081296033377",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      supplier_name: "Bagus",
      contact_phone: "0822-8326-2875",
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
    return queryInterface.bulkDelete('Suppliers', null, {})
  }
};
