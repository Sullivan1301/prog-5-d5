class CoffeeType {
    static ESPRESSO = new CoffeeType('espresso', 1.00, { water: 30, coffee: 7, milk: 0 });
    static ESPRESSO_LONG = new CoffeeType('espresso long', 1.20, { water: 60, coffee: 7, milk: 0 });
    static AMERICANO = new CoffeeType('americano', 1.50, { water: 200, coffee: 7, milk: 0 });
    static CAPPUCCINO = new CoffeeType('cappuccino', 2.00, { water: 150, coffee: 7, milk: 100 });
    static CAFE_AU_LAIT = new CoffeeType('café au lait', 1.80, { water: 100, coffee: 7, milk: 100 });
    static LATTE = new CoffeeType('latte', 2.20, { water: 100, coffee: 7, milk: 150 });
    static LATTE_MACCHIATO = new CoffeeType('latte macchiato', 2.30, { water: 100, coffee: 7, milk: 200 });
    static MOCHA = new CoffeeType('mocha', 2.50, { water: 100, coffee: 7, milk: 100, chocolate: 30 });
    static CARAMEL_LATTE = new CoffeeType('caramel latte', 2.60, { water: 100, coffee: 7, milk: 100, caramel: 30 });
    static VANILLA_LATTE = new CoffeeType('vanilla latte', 2.60, { water: 100, coffee: 7, milk: 100, vanilla: 20 });

    constructor(name, price, ingredients) {
        this.name = name;
        this.price = price;
        this.ingredients = ingredients;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getIngredients() {
        return { ...this.ingredients };
    }

    static fromString(type) {
        const types = [
            CoffeeType.ESPRESSO,
            CoffeeType.ESPRESSO_LONG,
            CoffeeType.AMERICANO,
            CoffeeType.CAPPUCCINO,
            CoffeeType.CAFE_AU_LAIT,
            CoffeeType.LATTE,
            CoffeeType.LATTE_MACCHIATO,
            CoffeeType.MOCHA,
            CoffeeType.CARAMEL_LATTE,
            CoffeeType.VANILLA_LATTE
        ];
        const coffeeType = types.find(t => t.name === type);
        if (!coffeeType) {
            throw new Error(`Invalid coffee type: ${type}`);
        }
        return coffeeType;
    }
}

module.exports = CoffeeType; 