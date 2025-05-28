class Money {
    constructor(amount) {
        if (amount < 0) {
            throw new Error('Amount cannot be negative');
        }
        this.amount = amount;
    }

    add(other) {
        return new Money(this.amount + other.amount);
    }

    subtract(other) {
        const newAmount = this.amount - other.amount;
        if (newAmount < 0) {
            throw new Error('Result cannot be negative');
        }
        return new Money(newAmount);
    }

    isGreaterThanOrEqual(other) {
        return this.amount >= other.amount;
    }

    getAmount() {
        return this.amount;
    }
}

module.exports = Money; 