const CoffeeMachine = require('../services/coffeeMachine');
const {
    InsufficientPaymentError,
    InvalidCoffeeTypeError,
    InsufficientIngredientsError,
    InvalidSequenceError
} = require('../domain/errors/CoffeeMachineError');

describe('CoffeeMachine', () => {
    let coffeeMachine;

    beforeEach(() => {
        coffeeMachine = new CoffeeMachine();
    });

    describe('Initialization', () => {
        test('should initialize with correct default balance', () => {
            expect(coffeeMachine.getBalance()).toBe(10.00);
        });

        test('should initialize with correct stock levels', () => {
            const stock = coffeeMachine.getStock();
            expect(stock).toEqual({
                water: 2000,
                coffee: 1000,
                milk: 2000,
                chocolate: 500,
                caramel: 500,
                vanilla: 300
            });
        });
    });

    describe('Payment', () => {
        test('should add money correctly', () => {
            const newBalance = coffeeMachine.addMoney(5.00);
            expect(newBalance).toBe(15.00);
        });

        test('should handle multiple payments', () => {
            coffeeMachine.addMoney(2.00);
            const newBalance = coffeeMachine.addMoney(3.00);
            expect(newBalance).toBe(15.00);
        });
    });

    describe('Coffee Selection', () => {
        test('should select valid coffee type', () => {
            coffeeMachine.selectCoffee('espresso');
            const selectedCoffee = coffeeMachine.getSelectedCoffee();
            expect(selectedCoffee.getType().getName()).toBe('espresso');
        });

        test('should throw error when selecting coffee without payment', () => {
            coffeeMachine.balance = new (require('../domain/valueObjects/Money'))(0);
            expect(() => coffeeMachine.selectCoffee('espresso'))
                .toThrow(InvalidSequenceError);
        });

        test('should throw error when selecting invalid coffee type', () => {
            expect(() => coffeeMachine.selectCoffee('invalid_coffee'))
                .toThrow(InvalidCoffeeTypeError);
        });

        test('should throw error when insufficient payment', () => {
            coffeeMachine.balance = new (require('../domain/valueObjects/Money'))(0.50);
            expect(() => coffeeMachine.selectCoffee('cappuccino'))
                .toThrow(InsufficientPaymentError);
        });

        test('should throw error when insufficient ingredients', () => {
            coffeeMachine.stock.water = 0;
            expect(() => coffeeMachine.selectCoffee('espresso'))
                .toThrow(InsufficientIngredientsError);
        });
    });

    describe('Coffee Preparation', () => {
        test('should prepare coffee correctly', () => {
            coffeeMachine.selectCoffee('espresso');
            const coffee = coffeeMachine.prepareCoffee();
            expect(coffee.isPrepared()).toBe(true);
        });

        test('should update stock after preparation', () => {
            const initialStock = { ...coffeeMachine.getStock() };
            coffeeMachine.selectCoffee('espresso');
            coffeeMachine.prepareCoffee();
            const finalStock = coffeeMachine.getStock();

            expect(finalStock.water).toBe(initialStock.water - 30);
            expect(finalStock.coffee).toBe(initialStock.coffee - 7);
        });

        test('should throw error when preparing without selection', () => {
            expect(() => coffeeMachine.prepareCoffee())
                .toThrow(InvalidSequenceError);
        });

        test('should handle special ingredients correctly', () => {
            coffeeMachine.selectCoffee('mocha');
            const coffee = coffeeMachine.prepareCoffee();
            expect(coffee.isPrepared()).toBe(true);

            const stock = coffeeMachine.getStock();
            expect(stock.chocolate).toBe(470); // 500 - 30
        });
    });

    describe('Edge Cases', () => {
        test('should handle multiple coffee preparations', () => {
            coffeeMachine.selectCoffee('espresso');
            coffeeMachine.prepareCoffee();
            coffeeMachine.selectCoffee('espresso');
            const coffee = coffeeMachine.prepareCoffee();
            expect(coffee.isPrepared()).toBe(true);
        });

        test('should handle maximum stock usage', () => {
            coffeeMachine.addMoney(1000.00);
            const maxCoffees = Math.floor(coffeeMachine.stock.water / 30);
            for (let i = 0; i < maxCoffees; i++) {
                coffeeMachine.selectCoffee('espresso');
                coffeeMachine.prepareCoffee();
            }
            expect(() => coffeeMachine.selectCoffee('espresso'))
                .toThrow(InsufficientIngredientsError);
        });

        test('should handle different coffee types in sequence', () => {
            coffeeMachine.selectCoffee('espresso');
            coffeeMachine.prepareCoffee();
            coffeeMachine.selectCoffee('cappuccino');
            const coffee = coffeeMachine.prepareCoffee();
            expect(coffee.getType().getName()).toBe('cappuccino');
        });
    });
}); 