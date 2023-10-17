const { Image, Superhero } = require('../models');

{/*
module.exports.createImage = async (req, res, next) => {
    try {
        const { heroInstance, body } = req;
console.log(heroInstance, 'HERO')
        const result = await heroInstance.createImage({ url: body.url, superheroId: heroInstance.id });
        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}
*/}



module.exports.createImage = async (req, res, next) => {
    console.log('OTRABOTAL');
    try {
        const { params: {heroId}, body } = req;
        const hero = await Superhero.findByPk(heroId);

        const result = await hero.createImage({ url: body.url, superheroId: heroId });

        console.log(result, 'HERO')
        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}


module.exports.getAllHeroImages = async (req, res, next) => {
    try {
        const { heroInstance } = req;
        const images = await heroInstance.getImages();
        return res.status(200).send(images);
    } catch (err) {
        next(err);
    }
}

// найти количество изображений супергероя по id героя
module.exports.getCountOfImages = async (req, res, next) => {
    try {
        const { heroInstance } = req;
        const imagesCount = await heroInstance.countImages();
        return res.status(200).send(`${imagesCount}`);
    } catch (err) {
        next(err);
    }
}

// удалить изобржаение по ID героя
module.exports.deleteImageByHeroId = async (req, res, next) => {
    try {
        const { heroInstance, params } = req;

        const image = await Image.findOne({
            where: {
                id: params.imageId,
                superheroId: params.heroId,
            }
        });

        if (!image) {
            return res.status(404).json({
                message: 'Изображение не найдено'
            })
        }

        await image.destroy();

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}

// обновить изображение по ID героя
module.exports.updateImage = async (req, res, next) => {
    try {
        const {params, body} = req;

        const image = await Image.findOne({
            where: {
                id: params.imageId,
                superheroId: params.heroId
            }
        });

        if (!image) {
            return res.status(404).json({
                message: 'Изображение не найдено'
            });
        }

        await image.update({url: body.url});

        return res.status(200).json(image);
    } catch (err) {
        next(err);
    }
}