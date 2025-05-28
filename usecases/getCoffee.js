class GetCoffeeUseCase {
    constructor(coffeeMachine) {
        this.coffeeMachine = coffeeMachine;
    }

    execute() {
        return this.coffeeMachine.prepareCoffee();
    }
}

module.exports = GetCoffeeUseCase; 