const {
    Superhero,
    Superpower,
    Image,
    CatchPhrase
} = require('../models');
const HeroNotFound = require('../errors/HeroNotFound');

// создание супергероя
module.exports.createSuperhero = async (req, res, next) => {
    try {
        const { body } = req;
        const createdSuperhero = await Superhero.create(body);

        return res.status(201).send(createdSuperhero);
    } catch (err) {
        next(err);
    }
}

// находим всех супергероев
module.exports.findAll = async (req, res, next) => {
    try {
        const { pagination } = req;
        const allSuperheroes = await Superhero.findAll({
            ...pagination
        });

        return res.status(200).send(allSuperheroes);
    } catch (err) {
        next(err);
    }
}

// ищем пользователя по id
module.exports.findById = async (req, res, next) => {
    try {
        const { params: { heroId } } = req;
        const heroById = await Superhero.findOne({
            where: {
                id: heroId
            }
        });

        return res.status(200).send(heroById);
    } catch (err) {
        next(err);
    }
}

// удаление супергероя по id
module.exports.deleteById = async (req, res, next) => {
    try {
        const {params: { heroId }} = req;

        const rowsCount = await Superhero.destroy({
            where: {
                id: heroId
            }
        });

        if (rowsCount > 0) {
            return res.status(200).send('Succesfull deleted');
        } else {
            return res.status(204);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.updateById = async (req, res, next) => {
    console.log(req, 'heroInstance')
    try {
        const { heroInstance, body } = req;

        const result = await heroInstance.update(body);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

// получить героя со всеми его суперсилами
module.exports.getHeroWithPowers = async (req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const heroWithPowers = await Superhero.findByPk(heroId, {
            attributes: ['id', 'nickname', 'real_name', 'origin_description'],
            include: {
                model: Superpower,
                required: true,
                through: {
                    attributes: []
                },
                attributes: ['id', 'name']
            }
        });

        if (!heroWithPowers) {
            throw new HeroNotFound();
        }

        return res.status(200).send(heroWithPowers);
    } catch (err) {
        next(err);
    }
}

// получить сущность супергероя и все его изображения
module.exports.getSuperheroWithImages = async (req, res, next) => {
    try {
        const {params: {heroId}} = req;

        const superhero = await Superhero.findByPk(heroId);

        if (!superhero) {
            throw new HeroNotFound();
        }

        const images = await superhero.getImages();

        return res.status(200).send({data: {superhero, images}});
    } catch (err) {
        next(err);
    }
}