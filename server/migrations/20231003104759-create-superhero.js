'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('superheroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      realName: {
        field: 'real_name',
        type: Sequelize.STRING,
        allowNull: false
      },
      originDescription: {
        type: Sequelize.TEXT,
        field: 'origin_description',
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('superheroes');
  }
};
