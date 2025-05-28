const { InsufficientPaymentError } = require('../domain/errors/CoffeeMachineError');

class PayUseCase {
    constructor(coffeeMachine) {
        this.coffeeMachine = coffeeMachine;
    }

    execute(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('Invalid payment amount');
        }
        if (amount <= 0) {
            throw new InsufficientPaymentError(0, amount);
        }
        this.coffeeMachine.addMoney(amount);
        return this.coffeeMachine.getBalance();
    }
}

module.exports = PayUseCase; 