const { User } = require('../models');
const HeroNotFound = require('../errors/HeroNotFound');
const { HERO_SCHEMA } = require('../schemas/hero.schema');

module.exports.getHeroInstance = async (req, res, next) => {
    try {
        const { params: {heroId} } = req;
        const hero = await HeroNotFound.findByPk(heroId, {
            attributes: {
                exclude: ['some_field']
            }
        });

        if (!hero) {
            throw new HeroNotFound('Hero not found');
        }

        req.heroInstance = hero;
    } catch (err) {
        next(err);
    }
}

module.exports.validateHero = async (req, res, next) => {
    try {
        const { body } = req;
        // const validated = await HERO_SCHEMA.validate(body);
        // if (validated) {
        //     next();
        // }
    } catch (errors) {
        next(errors);
    }
}