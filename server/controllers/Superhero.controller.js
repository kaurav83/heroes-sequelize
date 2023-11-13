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

        if (body?.images?.length) {
            const imgArr = body.images.map((image) => ({
                url: image,
                superheroId: createdSuperhero.id,
            }));

            await Image.bulkCreate(imgArr, {
                returning: true,
            })
        }

        if (body?.superPowers?.length) {
            for (let superPower of body.superPowers) {
                const powerById = await Superpower.findByPk(superPower.id);

                if (powerById) {
                    await powerById.addSuperhero(createdSuperhero);
                }
            }
        }

        const heroWithData = await Superhero.findAll({
            where: {
                id: createdSuperhero.id,
            },
            include: [
                {
                    model: Superpower,
                    attributes: ['id', 'name']
                },
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    as: 'images',
                },
            ],
        })

        return res.status(201).send({ data: heroWithData });
    } catch (err) {
        next(err);
    }
}

// находим всех супергероев
module.exports.findAll = async (req, res, next) => {
    try {
        const { pagination } = req;
        const allSuperheroes = await Superhero.findAll({
            include: [
                {
                    model: Superpower,
                    attributes: ['id', 'name']
                },
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    as: 'images',
                }
            ],
            order: [['updated_at', 'DESC']],
            ...pagination
        });

        if (!allSuperheroes.length) {
            throw new HeroNotFound();
        }

        return res.status(200).send({ data: allSuperheroes });
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
            },
            include: [
                {
                    model: Superpower,
                    attributes: ['id', 'name'],
                },
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    as: 'images'
                }
            ]
        });

        if (!heroById) {
            throw new HeroNotFound();
        }

        return res.status(200).send({ data: heroById });
    } catch (err) {
        next(err);
    }
}

// удаление супергероя по id
module.exports.deleteById = async (req, res, next) => {
    try {
        const { params: { heroId } } = req;

        const rowsCount = await Superhero.destroy({
            where: {
                id: heroId
            }
        });

        if (rowsCount === 0) {
            throw new HeroNotFound();
        }

        return res.status(200).end();
    } catch (err) {
        next(err);
    }
}

module.exports.updateById = async (req, res, next) => {
    try {
        const { heroInstance, body: { images }, body, params: { heroId } } = req;

        // const result = await heroInstance.update(body);
        const [count, [updatedHero]] = await Superhero.update(body, {
            where: {
                id: heroId,
            },
            returning: true,
        });

        if (images?.length) {
            const imgArr = images.map((image) => ({
                url: image,
                superheroId: heroId,
            }));

            await Image.destroy({
                where: {
                    superheroId: heroId
                },
            });

            await Image.bulkCreate(imgArr, {
                returning: true,
            });
        }

        if (body?.superPowers?.length) {
            // Обновить связи супергероя и суперспособностей
            const existingSuperPowers = await heroInstance.getSuperpowers();

            // Найти новые суперспособности для добавления
            const newSuperPowers = body.superPowers.filter((power) => {
                return !existingSuperPowers.some((existingPower) => existingPower.id === power.id);
            });

            // Найти суперспособности для удаления (если это необходимо)
            const removedSuperPowers = existingSuperPowers.filter((existingPower) => { 
                return !body.superPowers.some((power) => power.id === existingPower.id)
            });

            // Добавить новые связи
            for (const superPower of newSuperPowers) {
                const superpower = await Superpower.findByPk(superPower.id);

                if (superpower) {
                    await heroInstance.addSuperpower(superpower);
                }
            }

            // Удаление лишних связей
            for (const superPower of removedSuperPowers) {
                await heroInstance.removeSuperpower(superPower);
            }
        }

        if (count === 0) {
            throw new HeroNotFound();
        }

        const heroWithData = await Superhero.findAll({
            where: {
                id: updatedHero.id,
            },
            include: [
                {
                    model: Superpower,
                    attributes: ['id', 'name'],
                },
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    as: 'images',
                }
            ]
        })

        return res.status(200).send({ data: heroWithData });
    } catch (err) {
        next(err);
    }
}

// получить героя со всеми его суперсилами
module.exports.getHeroWithPowers = async (req, res, next) => {
    try {
        const { params: { heroId } } = req;
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
        const { params: { heroId } } = req;

        const superhero = await Superhero.findByPk(heroId);

        if (!superhero) {
            throw new HeroNotFound();
        }

        const images = await superhero.getImages();

        return res.status(200).send({ data: { superhero, images } });
    } catch (err) {
        next(err);
    }
}