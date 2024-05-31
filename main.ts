#! /usr/bin/env node

import inquirer from "inquirer";

interface BankAccount {
    accountNumber: number;
    balance: number;
    debit(amount: number): void;
    credit(amount: number): void;
}

class Customer {
    name: string;
    bankAccount: BankAccount;

    constructor(name: string, bankAccount: BankAccount) {
        this.name = name;
        this.bankAccount = bankAccount;
    }

    async interact() {
        console.log(`Welcome ${this.name}!`);
        while (true) {
            const action = await inquirer.prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: ["Check Balance", "Debit Money", "Credit Money", "Exit"]
            });
    
            if (action.action === "Check Balance") {
                console.log(`Your current balance is: $${this.bankAccount.balance}`);
            } else if (action.action === "Debit Money") {
                const { amount } = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to debit:"
                });
                this.bankAccount.debit(amount);
            } else if (action.action === "Credit Money") {
                const { amount } = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to credit:"
                });
                this.bankAccount.credit(amount);
            } else if (action.action === "Exit") {
                console.log("Thank you for using our bank services. Have a great day!");
                break;
            }
        }
    }
}

class MyBankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    debit(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Debit of $${amount} successful.`);
        } else {
            console.log(`Debit of $${amount} failed. Insufficient funds.`);
        }
    }

    credit(amount: number): void {
        this.balance += amount;
        console.log(`Credit of $${amount} successful.`);
    }
}


const myBankAccount = new MyBankAccount(123456789, 1000);
const customer = new Customer("Rabia", myBankAccount);

customer.interact();

