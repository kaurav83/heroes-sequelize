class HeroNotFound extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = HeroNotFound;