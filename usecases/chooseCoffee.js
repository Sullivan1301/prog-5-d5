class ChooseCoffeeUseCase {
    constructor(coffeeMachine) {
        this.coffeeMachine = coffeeMachine;
    }

    execute(type) {
        this.coffeeMachine.selectCoffee(type);
        return this.coffeeMachine.getSelectedCoffee();
    }
}

module.exports = ChooseCoffeeUseCase; 