const { ValidationError } = require('yup');
const HeroNotFount = require('./errors/HeroNotFound');

module.exports.errorHandler = async(err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).send(err.message);
    }

    if (err instanceof HeroNotFount) {
        return res.status(404).send(err.message);
    }
}
