const {
    CoffeeMachineError,
    InsufficientPaymentError,
    InsufficientStockError,
    NoCoffeeSelectedError,
    NoPaymentError
} = require('../../../domain/errors/CoffeeMachineError');

describe('CoffeeMachineError', () => {
    test('should create base error', () => {
        const error = new CoffeeMachineError('Test error');
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Test error');
    });

    test('should create insufficient payment error', () => {
        const error = new InsufficientPaymentError();
        expect(error).toBeInstanceOf(CoffeeMachineError);
        expect(error.message).toBe('Insufficient payment');
    });

    test('should create insufficient stock error', () => {
        const error = new InsufficientStockError('water');
        expect(error).toBeInstanceOf(CoffeeMachineError);
        expect(error.message).toBe('Insufficient stock of water');
    });

    test('should create no coffee selected error', () => {
        const error = new NoCoffeeSelectedError();
        expect(error).toBeInstanceOf(CoffeeMachineError);
        expect(error.message).toBe('No coffee selected');
    });

    test('should create no payment error', () => {
        const error = new NoPaymentError();
        expect(error).toBeInstanceOf(CoffeeMachineError);
        expect(error.message).toBe('No payment made');
    });
}); 