const CoffeeType = require('../valueObjects/CoffeeType');

class Coffee {
    constructor(type) {
        if (!(type instanceof CoffeeType)) {
            throw new Error('Invalid coffee type');
        }
        this.type = type;
        this.prepared = false;
    }

    prepare() {
        this.prepared = true;
    }

    isPrepared() {
        return this.prepared;
    }

    getType() {
        return this.type;
    }
}

module.exports = Coffee; 