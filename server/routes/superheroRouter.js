const { Router } = require('express');
const SuperheroController = require('../controllers/Superhero.controller');
const { getHeroInstance, validateHero } = require('../middlewares/hero.mw');
const pagination = require('../middlewares/pagination.mw');

const heroRouter = Router();

// heroRouter.post('/', validateHero, SuperheroController.createSuperhero);
heroRouter.post('/', SuperheroController.createSuperhero);
heroRouter.get('/', pagination, SuperheroController.findAll);
// heroRouter.get('/:heroId', getHeroInstance, SuperheroController.findById);
heroRouter.get('/:heroId', SuperheroController.findById);
heroRouter.delete('/:heroId', SuperheroController.deleteById);
heroRouter.put('/:heroId', getHeroInstance, SuperheroController.updateById);
heroRouter.get('/images/:heroId', SuperheroController.getSuperheroWithImages);
heroRouter.get('/powers/:heroId', SuperheroController.getHeroWithPowers);

module.exports = heroRouter;
