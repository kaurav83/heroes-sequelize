'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('superheroes_to_superpowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      superheroId: {
        field: 'superhero_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'superheroes',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      superpowerId: {
        field: 'superpower_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'superpowers',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('superheroes_to_superpowers');
  }
};
