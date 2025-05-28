const GetCoffeeUseCase = require('../../usecases/getCoffee');
const CoffeeMachine = require('../../services/coffeeMachine');
const { InvalidSequenceError } = require('../../domain/errors/CoffeeMachineError');

describe('GetCoffeeUseCase', () => {
    let coffeeMachine;
    let getCoffeeUseCase;

    beforeEach(() => {
        coffeeMachine = new CoffeeMachine();
        getCoffeeUseCase = new GetCoffeeUseCase(coffeeMachine);
    });

    describe('execute', () => {
        test('should prepare coffee correctly', () => {
            coffeeMachine.selectCoffee('espresso');
            const coffee = getCoffeeUseCase.execute();
            expect(coffee.isPrepared()).toBe(true);
        });

        test('should throw error when no coffee selected', () => {
            expect(() => getCoffeeUseCase.execute())
                .toThrow(InvalidSequenceError);
        });

        test('should update stock after preparation', () => {
            const initialStock = { ...coffeeMachine.getStock() };
            coffeeMachine.selectCoffee('espresso');
            getCoffeeUseCase.execute();
            const finalStock = coffeeMachine.getStock();

            expect(finalStock.water).toBe(initialStock.water - 30);
            expect(finalStock.coffee).toBe(initialStock.coffee - 7);
        });

        test('should handle special ingredients', () => {
            coffeeMachine.selectCoffee('mocha');
            const coffee = getCoffeeUseCase.execute();
            expect(coffee.isPrepared()).toBe(true);

            const stock = coffeeMachine.getStock();
            expect(stock.chocolate).toBe(470); // 500 - 30
        });

        test('should handle multiple preparations', () => {
            coffeeMachine.selectCoffee('espresso');
            getCoffeeUseCase.execute();
            coffeeMachine.selectCoffee('espresso');
            const coffee = getCoffeeUseCase.execute();
            expect(coffee.isPrepared()).toBe(true);
        });

        test('should handle different coffee types', () => {
            coffeeMachine.selectCoffee('espresso');
            getCoffeeUseCase.execute();
            coffeeMachine.selectCoffee('cappuccino');
            const coffee = getCoffeeUseCase.execute();
            expect(coffee.getType().getName()).toBe('cappuccino');
        });

        test('should handle all ingredients for complex coffee', () => {
            coffeeMachine.selectCoffee('vanilla latte');
            const coffee = getCoffeeUseCase.execute();
            expect(coffee.isPrepared()).toBe(true);

            const stock = coffeeMachine.getStock();
            expect(stock.water).toBe(1900); // 2000 - 100
            expect(stock.coffee).toBe(993); // 1000 - 7
            expect(stock.milk).toBe(1900); // 2000 - 100
            expect(stock.vanilla).toBe(280); // 300 - 20
        });
    });
}); 