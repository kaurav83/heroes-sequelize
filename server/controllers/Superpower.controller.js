const HeroNotFound = require('../errors/HeroNotFound');
const { Superhero, Superpower } = require('../models');

module.exports.createSuperpower = async (req, res, next) => {
    try {
        const { body } = req;
        const createPower = await Superpower.create(body);
        return res.status(201).send(createPower);
    } catch (err) {
        next(err);
    }
}

// добавляем суперсилу герою
module.exports.addHeroToPower = async (req, res, next) => {
    try {
        const { heroInstance, params: { powerId } } = req;
        const power = await Superpower.findByPk(powerId);
        const result = await power.addSuperhero(heroInstance);
        return res.status(200).send('Power successfully added to Hero');
    } catch (err) {
        next(err);
    }
}

// получить героя со всеми суперсилами, которые у него есть
module.exports.getHeroPowers = async (req, res, next) => {
    try {
        const { heroInstance } = req;

        const powers = await heroInstance.getSuperpowers();
        return res.status(200).send(powers);
    } catch (err) {
        next(err);
    }
}

// удалить суперсилу у героя
module.exports.deletePowerFromHero = async (req, res, next) => {
    try {
        const { heroInstance, params: { powerId } } = req;
        const powerInstance = await Superpower.findByPk(powerId);

        const rowCount = await powerInstance.removeSuperhero(heroInstance);

        if (rowCount) {
            return res.status(200).send('Power succesfully deleted from hero');
        }

        return res.status(200).send('Hero is never had this power');
    } catch (err) {
        next(err);
    }
}

// получить суперсилу и тех героев, которые ею обладают
module.exports.getPowerWithHeroes = async (req, res, next) => {
    try {
        const {params: { powerId }} = req;
        const powerWithHeroes = await Superpower.findByPk(powerId, {
            include: [{
                model: Superhero,
                attributes: {
                    exclude: ['updated_at']
                }
            }]
        });

        return res.status(200).send(powerWithHeroes);
    } catch (err) {
        next(err);
    }
}

// получить все суперсилы
module.exports.getAllPowers = async(req, res, next) => {
    try {
        const allPowers = await Superpower.findAll();
        return res.status(200).send(allPowers);
    } catch (error) {
        next(error);
    }
}