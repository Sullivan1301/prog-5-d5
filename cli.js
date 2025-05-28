const readline = require('readline');
const CoffeeMachine = require('./services/coffeeMachine');
const PayUseCase = require('./usecases/pay');
const ChooseCoffeeUseCase = require('./usecases/chooseCoffee');
const GetCoffeeUseCase = require('./usecases/getCoffee');
const CoffeeType = require('./domain/valueObjects/CoffeeType');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const coffeeMachine = new CoffeeMachine();
const payUseCase = new PayUseCase(coffeeMachine);
const chooseCoffeeUseCase = new ChooseCoffeeUseCase(coffeeMachine);
const getCoffeeUseCase = new GetCoffeeUseCase(coffeeMachine);

const coffeeCategories = {
    'Base Coffees': [
        CoffeeType.ESPRESSO,
        CoffeeType.ESPRESSO_LONG,
        CoffeeType.AMERICANO,
        CoffeeType.CAPPUCCINO
    ],
    'Milk Coffees': [
        CoffeeType.CAFE_AU_LAIT,
        CoffeeType.LATTE,
        CoffeeType.LATTE_MACCHIATO
    ],
    'Special Coffees': [
        CoffeeType.MOCHA,
        CoffeeType.CARAMEL_LATTE,
        CoffeeType.VANILLA_LATTE
    ]
};

function displayMenu() {
    console.log('\n=== Coffee Express ===');
    let optionNumber = 1;
    const coffeeOptions = new Map();

    for (const [category, coffees] of Object.entries(coffeeCategories)) {
        console.log(`\n${category}:`);
        coffees.forEach(coffee => {
            console.log(`${optionNumber}. ${coffee.getName()} - $${coffee.getPrice().toFixed(2)}`);
            coffeeOptions.set(optionNumber.toString(), coffee);
            optionNumber++;
        });
    }
    console.log('\n0. Exit');
    console.log(`\nCurrent balance: $${coffeeMachine.getBalance().toFixed(2)}`);
    return coffeeOptions;
}

async function processPayment() {
    return new Promise((resolve) => {
        rl.question('\nPlease insert your money (amount in $): ', (amount) => {
            try {
                const balance = payUseCase.execute(parseFloat(amount));
                console.log(`Current balance: $${balance.toFixed(2)}`);
                resolve(balance);
            } catch (error) {
                console.error('Payment error:', error.message);
                resolve(0);
            }
        });
    });
}

async function prepareCoffee() {
    try {
        const coffee = getCoffeeUseCase.execute();
        console.log(`\nYour ${coffee.type} is ready! Enjoy! ☕`);
        return true;
    } catch (error) {
        console.error('Preparation error:', error.message);
        return false;
    }
}

async function main() {
    let running = true;
    while (running) {
        const coffeeOptions = displayMenu();

        const choice = await new Promise((resolve) => {
            rl.question('\nYour choice: ', resolve);
        });

        if (choice === '0') {
            console.log('\nThank you for using our coffee machine! Goodbye!');
            running = false;
            continue;
        }

        const selectedCoffee = coffeeOptions.get(choice);
        if (selectedCoffee) {
            try {
                const coffee = chooseCoffeeUseCase.execute(selectedCoffee.getName());
                console.log(`Selected coffee: ${coffee.getType().getName()} - $${coffee.getType().getPrice().toFixed(2)}`);
                await prepareCoffee();
            } catch (error) {
                if (error.message.includes('Insufficient payment')) {
                    console.log('\nInsufficient balance. Would you like to add money? (y/n)');
                    const addMoney = await new Promise((resolve) => {
                        rl.question('', resolve);
                    });

                    if (addMoney.toLowerCase() === 'y') {
                        const balance = await processPayment();
                        if (balance > 0) {
                            const coffee = chooseCoffeeUseCase.execute(selectedCoffee.getName());
                            console.log(`Selected coffee: ${coffee.getType().getName()} - $${coffee.getType().getPrice().toFixed(2)}`);
                            await prepareCoffee();
                        }
                    }
                } else {
                    console.error('Error:', error.message);
                }
            }
        } else {
            console.log('Invalid choice');
        }

        await new Promise((resolve) => {
            rl.question('\nPress Enter to continue...', resolve);
        });
    }

    rl.close();
}

main().catch(console.error); 