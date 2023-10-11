const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Image extends Model {}

    Image.init({
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Image',
        tableName: 'images',
        underscored: true
    });

    Image.associate = (models) => {
        Image.belongsTo(models.Superhero, { foreignKey: 'superheroId' });
    };

    return Image;
}