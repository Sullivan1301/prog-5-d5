const Money = require('../domain/valueObjects/Money');
const CoffeeType = require('../domain/valueObjects/CoffeeType');
const Coffee = require('../domain/entities/Coffee');
const {
    CoffeeMachineError,
    InsufficientPaymentError,
    InvalidCoffeeTypeError,
    InsufficientIngredientsError,
    InvalidSequenceError
} = require('../domain/errors/CoffeeMachineError');

class CoffeeMachine {
    constructor() {
        this.balance = new Money(10.00);
        this.selectedCoffee = null;
        this.stock = {
            water: 2000,
            coffee: 1000,
            milk: 2000,
            chocolate: 500,
            caramel: 500,
            vanilla: 300
        };
    }

    getBalance() {
        return this.balance.getAmount();
    }

    getStock() {
        return { ...this.stock };
    }

    getSelectedCoffee() {
        return this.selectedCoffee;
    }

    addMoney(amount) {
        this.balance = this.balance.add(new Money(amount));
        return this.balance.getAmount();
    }

    selectCoffee(type) {
        if (this.balance.getAmount() === 0) {
            throw new InvalidSequenceError('Payment required before selecting coffee');
        }

        try {
            const coffeeType = CoffeeType.fromString(type);
            if (!this.balance.isGreaterThanOrEqual(new Money(coffeeType.getPrice()))) {
                throw new InsufficientPaymentError(coffeeType.getPrice(), this.balance.getAmount());
            }

            const ingredients = coffeeType.getIngredients();
            if (this.stock.water < ingredients.water) {
                throw new InsufficientIngredientsError('water');
            }
            if (this.stock.coffee < ingredients.coffee) {
                throw new InsufficientIngredientsError('coffee');
            }
            if (this.stock.milk < (ingredients.milk || 0)) {
                throw new InsufficientIngredientsError('milk');
            }
            if (ingredients.chocolate && this.stock.chocolate < ingredients.chocolate) {
                throw new InsufficientIngredientsError('chocolate');
            }
            if (ingredients.caramel && this.stock.caramel < ingredients.caramel) {
                throw new InsufficientIngredientsError('caramel');
            }
            if (ingredients.vanilla && this.stock.vanilla < ingredients.vanilla) {
                throw new InsufficientIngredientsError('vanilla');
            }

            this.selectedCoffee = new Coffee(coffeeType);
            this.balance = this.balance.subtract(new Money(coffeeType.getPrice()));
            return this.selectedCoffee;
        } catch (error) {
            if (error instanceof CoffeeMachineError) {
                throw error;
            }
            throw new InvalidCoffeeTypeError(type);
        }
    }

    prepareCoffee() {
        if (!this.selectedCoffee) {
            throw new InvalidSequenceError('No coffee selected');
        }

        const ingredients = this.selectedCoffee.getType().getIngredients();
        this.stock.water -= ingredients.water;
        this.stock.coffee -= ingredients.coffee;
        this.stock.milk -= (ingredients.milk || 0);
        if (ingredients.chocolate) this.stock.chocolate -= ingredients.chocolate;
        if (ingredients.caramel) this.stock.caramel -= ingredients.caramel;
        if (ingredients.vanilla) this.stock.vanilla -= ingredients.vanilla;

        this.selectedCoffee.prepare();
        const preparedCoffee = this.selectedCoffee;
        this.selectedCoffee = null;
        return preparedCoffee;
    }
}

module.exports = CoffeeMachine; 