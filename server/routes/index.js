const { Router } = require('express');
const heroRouter = require('./userRouter');

const router = Router();

router.use('/hero', heroRouter);

module.exports = router;