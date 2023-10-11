const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Superpower extends Model {}

    Superpower.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Superpower',
        tableName: 'superpowers',
        underscored: true
    });

    Superpower.associate = (models) => {
        Superpower.belongsToMany(models.Superhero, { through: 'superheroes_to_superpowers', foreignKey: 'superpowerId'});
    };

    return Superpower;
}