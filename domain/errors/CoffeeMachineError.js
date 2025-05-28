class CoffeeMachineError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class InsufficientPaymentError extends CoffeeMachineError {
    constructor() {
        super('Insufficient payment');
    }
}

class InsufficientStockError extends CoffeeMachineError {
    constructor(ingredient) {
        super(`Insufficient stock of ${ingredient}`);
    }
}

class NoCoffeeSelectedError extends CoffeeMachineError {
    constructor() {
        super('No coffee selected');
    }
}

class NoPaymentError extends CoffeeMachineError {
    constructor() {
        super('No payment made');
    }
}

class InvalidCoffeeTypeError extends CoffeeMachineError {
    constructor(type) {
        super(`Invalid coffee type: ${type}`);
    }
}

class InsufficientIngredientsError extends CoffeeMachineError {
    constructor(ingredient) {
        super(`Insufficient ${ingredient}`);
    }
}

class InvalidSequenceError extends CoffeeMachineError {
    constructor(message) {
        super(`Invalid sequence: ${message}`);
    }
}

module.exports = {
    CoffeeMachineError,
    InsufficientPaymentError,
    InsufficientStockError,
    NoCoffeeSelectedError,
    NoPaymentError,
    InvalidCoffeeTypeError,
    InsufficientIngredientsError,
    InvalidSequenceError
}; 