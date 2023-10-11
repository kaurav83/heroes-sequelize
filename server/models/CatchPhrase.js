const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class CatchPhrase extends Model {}

    CatchPhrase.init({
        phrase: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'CatchPhrase',
        tableName: 'catch_phrases',
        underscored: true
    });

    CatchPhrase.associate = (models) => {
        CatchPhrase.belongsTo(models.Superhero, { foreignKey: 'superheroId' })
    };

    return CatchPhrase;
}