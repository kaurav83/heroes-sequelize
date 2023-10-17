const { Router } = require('express');
const { getHeroInstance } = require('../middlewares/hero.mw');
const pagination = require('../middlewares/pagination.mw');
const PhraseController = require('../controllers/PhraseController.controller');

const phraseRouter = Router();

phraseRouter.post('/:heroId', getHeroInstance, PhraseController.createPhrase);
phraseRouter.put('/:heroId', getHeroInstance, PhraseController.createPhrase);
phraseRouter.get('/:heroId', getHeroInstance, PhraseController.getPhrase);

module.exports = phraseRouter;
