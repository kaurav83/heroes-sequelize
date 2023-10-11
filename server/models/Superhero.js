const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Superhero extends Model { }

    Superhero.init({
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        realName: {
            type: DataTypes.STRING,
            field: 'real_name',
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        originDescription: {
            type: DataTypes.TEXT,
            field: 'origin_description',
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        }
    }, {
        sequelize,
        modelName: 'Superhero',
        tableName: 'superheroes',
        underscored: true
    });

    Superhero.associate = (models) => {
        Superhero.belongsToMany(models.Superpower, { through: 'superheroes_to_superpowers', foreignKey: 'superheroId' });
        Superhero.hasOne(models.CatchPhrase, { foreignKey: 'superheroId' });
        Superhero.hasMany(models.Image, { foreignKey: 'superheroId' });
    }

    return Superhero;
}