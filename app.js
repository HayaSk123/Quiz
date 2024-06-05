#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let userScore = 0;
async function askQuestion(question, choices, correctAnswer) {
    let answer = await inquirer.prompt([{
            name: "answer",
            type: "list",
            message: chalk.blueBright(question),
            choices: choices
        }]);
    if (answer.answer === correctAnswer) {
        console.log(chalk.greenBright("Correct Answer!"));
        userScore += 1;
        return true;
    }
    else {
        console.log(chalk.redBright("Wrong Answer!"));
        return false;
    }
}
async function playAgain() {
    const againQuiz = await inquirer.prompt([{
            name: "playAgain",
            type: "list",
            message: chalk.yellow("Would you like to attempt the quiz again?"),
            choices: ["Yes", "No"]
        }]);
    return againQuiz.playAgain === "Yes";
}
async function main() {
    console.log(chalk.cyanBright.bold("\t \t Welcome to the TypeScript Quiz!"));
    console.log("-".repeat(60));
    console.log(chalk.cyanBright("Test your knowledge and see how much you know about TypeScript."));
    console.log(chalk.cyanBright("Let's get started!\n"));
    let correctAnswer = true;
    const questions = [
        {
            question: "What is TypeScript?",
            choices: ["A. A database management system", "B. A front-end framework", "C. A programming language that builds on JavaScript", "D. A CSS preprocessor"],
            answer: "C. A programming language that builds on JavaScript"
        },
        {
            question: "Which of the following is the correct way to define a variable in TypeScript?",
            choices: [`A. let name: string = "John";`, `B. let name: String = "John";`, `C. let name = "John";`, `D. let name : "John";`],
            answer: `A. let name: string = "John";`
        },
        {
            question: "How do you compile a TypeScript file?",
            choices: [`A. tsc filename.ts`, `B. compile filename.ts`, `C. tsc filename`, `D. compile filename`],
            answer: `A. tsc filename.ts`
        },
        {
            question: "What is the file extension for a TypeScript file?",
            choices: [`A. .js`, `B. .ts`, `C. .jsx`, `D. .tsx`],
            answer: `B. .ts`
        },
        {
            question: "Which of the following TypeScript types can hold a true or false value?",
            choices: [`A. string`, `B. number`, `C. boolean`, `D. any`],
            answer: `C. boolean`
        },
        {
            question: "How do you specify a function in TypeScript that returns a string?",
            choices: [`A. function greet(): string {}`, `B. function greet() string {}`, `C. function greet(): String {}`, `D. function greet() : string {}`],
            answer: `A. function greet(): string {}`
        },
        {
            question: "What does the following TypeScript code do? let age: number = 30;",
            choices: [`A. Declares a variable age with a number type and assigns it the value 30`, `B. Declares a variable age with a string type and assigns it the value 30`, `C. Declares a variable age without specifying a type`, `D. Declares a constant age with a number type and assigns it the value 30`],
            answer: `A. Declares a variable age with a number type and assigns it the value 30`
        },
        {
            question: "Which TypeScript feature allows you to define the structure of an object?",
            choices: [`A. Interfaces`, `B. Classes`, `C. Modules`, `D. Functions`],
            answer: `A. Interfaces`
        },
        {
            question: "How do you write an interface in TypeScript?",
            choices: [`A. interface Person { name: string; age: number; }`, `B. class Person { name: string; age: number; }`, `C. type Person { name: string; age: number; }`, `D. struct Person { name: string; age: number; }`],
            answer: `A. interface Person { name: string; age: number; }`
        },
        {
            question: "What is the purpose of the any type in TypeScript?",
            choices: [`A. To specify that a variable can only hold string values`, `B. To specify that a variable can only hold numeric values`, `C. To specify that a variable can hold any type of value`, `D. To specify that a variable can hold boolean values`],
            answer: `C. To specify that a variable can hold any type of value`
        }
    ];
    while (correctAnswer) {
        for (const q of questions) {
            correctAnswer = await askQuestion(q.question, q.choices, q.answer);
            if (!correctAnswer)
                break;
        }
        if (correctAnswer) {
            console.log(chalk.magentaBright(`Congratulations! You answered all questions correctly. Your final score is: ${userScore}`));
        }
        correctAnswer = await playAgain();
        if (correctAnswer) {
            userScore = 0; // Reset the score if they choose to play again
        }
    }
    console.log(chalk.cyanBright("Thank you for attempting our Quiz!"));
}
main();
