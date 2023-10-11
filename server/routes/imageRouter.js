const { Router } = require('express');
const { getHeroInstance } = require('../middlewares/hero.mw');
const pagination = require('../middlewares/pagination.mw');
const ImageController = require('../controllers/Images.controller');

const imageRouter = Router();

imageRouter.post('/:heroId', ImageController.createImage);
imageRouter.get('/:heroId', pagination, getHeroInstance, ImageController.getAllHeroImages);
imageRouter.get('/count/:heroId', getHeroInstance, ImageController.getCountOfImages);

module.exports = imageRouter;
