// Types et interfaces
interface PaymentMethod {
    type: 'cash' | 'card' | 'token' | 'contactless';
    amount: number;
}

interface CoffeeType {
    id: string;
    name: string;
    price: number;
    waterNeeded: number;
    coffeeNeeded: number;
}

interface Stock {
    water: number;
    coffee: number;
    cups: number;
}

// Énumérations pour les états et erreurs
enum MachineState {
    IDLE = 'IDLE',
    PAYMENT_PENDING = 'PAYMENT_PENDING',
    COFFEE_SELECTION = 'COFFEE_SELECTION',
    PREPARING = 'PREPARING',
    ERROR = 'ERROR'
}

enum ErrorType {
    INSUFFICIENT_PAYMENT = 'INSUFFICIENT_PAYMENT',
    NO_WATER = 'NO_WATER',
    NO_COFFEE = 'NO_COFFEE',
    NO_CUPS = 'NO_CUPS',
    TECHNICAL_ERROR = 'TECHNICAL_ERROR'
}

// Classe principale de la machine à café
class CoffeeMachine {
    private state: MachineState;
    private stock: Stock;
    private currentPayment: PaymentMethod | null;
    private selectedCoffee: CoffeeType | null;
    private availableCoffees: CoffeeType[];

    constructor() {
        this.state = MachineState.IDLE;
        this.stock = {
            water: 1000, // ml
            coffee: 500, // g
            cups: 50
        };
        this.currentPayment = null;
        this.selectedCoffee = null;
        this.availableCoffees = [
            {
                id: 'espresso',
                name: 'Espresso',
                price: 1.00,
                waterNeeded: 30,
                coffeeNeeded: 7
            },
            {
                id: 'americano',
                name: 'Americano',
                price: 1.50,
                waterNeeded: 200,
                coffeeNeeded: 7
            },
            {
                id: 'cappuccino',
                name: 'Cappuccino',
                price: 2.00,
                waterNeeded: 150,
                coffeeNeeded: 7
            }
        ];
    }

    // Méthodes publiques principales
    public insertPayment(payment: PaymentMethod): boolean {
        if (this.state !== MachineState.IDLE) {
            return false;
        }

        this.currentPayment = payment;
        this.state = MachineState.PAYMENT_PENDING;
        return true;
    }

    public selectCoffee(coffeeId: string): boolean {
        if (this.state !== MachineState.PAYMENT_PENDING) {
            return false;
        }

        const coffee = this.availableCoffees.find(c => c.id === coffeeId);
        if (!coffee) {
            return false;
        }

        if (this.currentPayment && this.currentPayment.amount < coffee.price) {
            this.handleError(ErrorType.INSUFFICIENT_PAYMENT);
            return false;
        }

        this.selectedCoffee = coffee;
        this.state = MachineState.COFFEE_SELECTION;
        return true;
    }

    public prepareCoffee(): boolean {
        if (this.state !== MachineState.COFFEE_SELECTION || !this.selectedCoffee) {
            return false;
        }

        // Vérification des stocks
        if (!this.checkStock()) {
            return false;
        }

        this.state = MachineState.PREPARING;

        // Simulation de la préparation
        this.updateStock();

        this.state = MachineState.IDLE;
        this.currentPayment = null;
        this.selectedCoffee = null;

        return true;
    }

    // Méthodes privées utilitaires
    private checkStock(): boolean {
        if (!this.selectedCoffee) return false;

        if (this.stock.water < this.selectedCoffee.waterNeeded) {
            this.handleError(ErrorType.NO_WATER);
            return false;
        }

        if (this.stock.coffee < this.selectedCoffee.coffeeNeeded) {
            this.handleError(ErrorType.NO_COFFEE);
            return false;
        }

        if (this.stock.cups < 1) {
            this.handleError(ErrorType.NO_CUPS);
            return false;
        }

        return true;
    }

    private updateStock(): void {
        if (!this.selectedCoffee) return;

        this.stock.water -= this.selectedCoffee.waterNeeded;
        this.stock.coffee -= this.selectedCoffee.coffeeNeeded;
        this.stock.cups -= 1;
    }

    private handleError(error: ErrorType): void {
        this.state = MachineState.ERROR;
        // Ici, vous pouvez ajouter la logique pour gérer les erreurs
        // Par exemple, envoyer une notification, logger l'erreur, etc.
        console.error(`Error: ${error}`);
    }

    // Getters pour l'état actuel
    public getState(): MachineState {
        return this.state;
    }

    public getStock(): Stock {
        return { ...this.stock };
    }

    public getAvailableCoffees(): CoffeeType[] {
        return [...this.availableCoffees];
    }
}

export { CoffeeMachine, MachineState, ErrorType, PaymentMethod, CoffeeType, Stock }; 