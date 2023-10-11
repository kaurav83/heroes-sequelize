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
    try {
        const { params: {heroId}, body } = req;

        // console.log(heroId, 'HERO')
        const hero = await Superhero.findByPk(heroId);
        const result = await hero.createImage({ url: body.url, superheroId: heroInstance.id });
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