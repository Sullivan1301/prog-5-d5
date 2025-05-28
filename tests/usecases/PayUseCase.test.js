const PayUseCase = require('../../usecases/pay');
const CoffeeMachine = require('../../services/coffeeMachine');
const { InsufficientPaymentError } = require('../../domain/errors/CoffeeMachineError');

describe('PayUseCase', () => {
    let coffeeMachine;
    let payUseCase;

    beforeEach(() => {
        coffeeMachine = new CoffeeMachine();
        payUseCase = new PayUseCase(coffeeMachine);
    });

    describe('execute', () => {
        test('should add valid payment amount', () => {
            const balance = payUseCase.execute(5.00);
            expect(balance).toBe(15.00);
        });

        test('should handle multiple payments', () => {
            payUseCase.execute(2.00);
            const balance = payUseCase.execute(3.00);
            expect(balance).toBe(15.00);
        });

        test('should handle zero payment', () => {
            expect(() => payUseCase.execute(0))
                .toThrow(InsufficientPaymentError);
        });

        test('should handle negative payment', () => {
            expect(() => payUseCase.execute(-5.00))
                .toThrow(InsufficientPaymentError);
        });

        test('should handle non-numeric payment', () => {
            expect(() => payUseCase.execute('invalid'))
                .toThrow();
        });

        test('should handle very large payment', () => {
            const balance = payUseCase.execute(1000.00);
            expect(balance).toBe(1010.00);
        });
    });
}); 