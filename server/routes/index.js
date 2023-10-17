const { Router } = require('express');
const heroRouter = require('./superheroRouter');
const powerRouter = require('./superpowerRouter');
const imageRouter = require('./imageRouter');
const phraseRouter = require('./phraseRouter');

const router = Router();

router.use('/hero', heroRouter);
router.use('/power', powerRouter);
router.use('/image', imageRouter);
router.use('/phrase', phraseRouter);

module.exports = router;