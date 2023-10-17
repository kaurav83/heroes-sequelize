const { CatchPhrase, Superhero } = require('../models');

module.exports.createPhrase = async (req, res, next) => {
    try {
        const { params: {heroId}, heroInstance, body } = req;

        const result = await heroInstance.createCatchPhrase({ phrase: body.phrase, superheroId: heroId });

        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}

module.exports.updatePhrase = async (req, res, next) => {
    try {
        const { heroInstance, params: {heroId}, body } = req;

        const result = await heroInstance.setCatchPhrase({ phrase: body.phrase, superheroId: heroId });

        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}

module.exports.getPhrase = async (req, res, next) => {
    try {
        const { heroInstance, params: { heroId }, body } = req;

        const result = await heroInstance.getCatchPhrase({superheroId: heroId});

        console.log(result, 'RESULT HERO UPDATE');

        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}