const ChooseCoffeeUseCase = require('../../usecases/chooseCoffee');
const CoffeeMachine = require('../../services/coffeeMachine');
const {
    InsufficientPaymentError,
    InvalidCoffeeTypeError,
    InsufficientIngredientsError
} = require('../../domain/errors/CoffeeMachineError');

describe('ChooseCoffeeUseCase', () => {
    let coffeeMachine;
    let chooseCoffeeUseCase;

    beforeEach(() => {
        coffeeMachine = new CoffeeMachine();
        chooseCoffeeUseCase = new ChooseCoffeeUseCase(coffeeMachine);
    });

    describe('execute', () => {
        test('should select valid coffee type', () => {
            const coffee = chooseCoffeeUseCase.execute('espresso');
            expect(coffee.getType().getName()).toBe('espresso');
        });

        test('should throw error for invalid coffee type', () => {
            expect(() => chooseCoffeeUseCase.execute('invalid_coffee'))
                .toThrow(InvalidCoffeeTypeError);
        });

        test('should throw error when insufficient payment', () => {
            coffeeMachine.balance = new (require('../../domain/valueObjects/Money'))(0.50);
            expect(() => chooseCoffeeUseCase.execute('cappuccino'))
                .toThrow(InsufficientPaymentError);
        });

        test('should throw error when insufficient ingredients', () => {
            coffeeMachine.stock.water = 0;
            expect(() => chooseCoffeeUseCase.execute('espresso'))
                .toThrow(InsufficientIngredientsError);
        });

        test('should handle all coffee types', () => {
            coffeeMachine.addMoney(1000.00);
            const coffeeTypes = [
                'espresso',
                'espresso long',
                'americano',
                'cappuccino',
                'café au lait',
                'latte',
                'latte macchiato',
                'mocha',
                'caramel latte',
                'vanilla latte'
            ];

            coffeeTypes.forEach(type => {
                const coffee = chooseCoffeeUseCase.execute(type);
                expect(coffee.getType().getName()).toBe(type);
            });
        });

        test('should handle special characters in coffee type', () => {
            const coffee = chooseCoffeeUseCase.execute('café au lait');
            expect(coffee.getType().getName()).toBe('café au lait');
        });
    });
}); 