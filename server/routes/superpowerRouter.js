const { Router } = require('express');
const  { getHeroInstance } = require('../middlewares/hero.mw');
const PowerController = require('../controllers/Superpower.controller');

const powerRouter = Router();

powerRouter.post('/', PowerController.createSuperpower);
powerRouter.put('/:heroId/:powerId', getHeroInstance, PowerController.addHeroToPower);
powerRouter.get('/:heroId', getHeroInstance, PowerController.getHeroPowers);
powerRouter.get('/', PowerController.getAllPowers);
powerRouter.delete('/:heroId/:powerId', getHeroInstance, PowerController.deletePowerFromHero);
powerRouter.get('/:powerId/heroes', PowerController.getPowerWithHeroes);

module.exports = powerRouter;
