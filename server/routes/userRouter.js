const { Router } = require('express');
const HeroController = require('../controllers/Hero.controller');
const { getHeroInstance, validateHero } = require('../middlewares/hero.mv');
const pagination = require('../middlewares/pagination.mv');

const heroRouter = Router();

heroRouter.post('/', validateHero, HeroController.createHero);
heroRouter.get('/', pagination, HeroController.findAll);
heroRouter.get('/:heroId', getHeroInstance, HeroController.findById);
heroRouter.delete('/:heroId', HeroController.deleteById);
heroRouter.put('/:heroId', getHeroInstance, HeroController.updateById);

module.exports = heroRouter;
