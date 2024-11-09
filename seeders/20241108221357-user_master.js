'use strict';

const { DATE } = require('sequelize');

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
    return await queryInterface.bulkInsert('Users', [{
      fullname: 'Admin Utama',
      email: 'admin@gmail.com',
      password: '$2b$10$uDnTGuxXg3GD/rsN2xXf2ObSBSQh8kXtmdJyKSq9UU62YAVggVNFK', // admin123
      role_id: 1,
      ceatedAt: new Date()
    }],
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
