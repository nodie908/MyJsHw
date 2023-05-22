/*Задача 1
========
Создайте функцию infinite(list, tries), которая будет проходиться по элементам списка list заданное количество раз (tries) циклически. Один раз - один элемент списка. После вывода последнего значения последовательности процедура начнется с самого начала.**/

function* infinite(list) {
    while (true) {
        for (let item of list) {
            yield item.toString();
        }
    }
}

function generateSequence(list, tries) {
    let result = '';
    let iterator = infinite(list);

    for (let i = 0; i < tries; i++) {
        result += iterator.next().value;
    }

    return result;
}

let list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let tries = 22;

let result = generateSequence(list, tries);
console.log(`Резалт первой задачи: ${result}`);



/*Задача 2
========
Числа Фибоначчи представляют последовательность, получаемую в результате сложения двух предыдущих элементов. Начинается коллекция с чисел 1 и 1. Она достаточно быстро растет, поэтому вычисление больших значений занимает немало времени.
Создайте генератор fib(n), который каждый раз возвращает следующее число Фибоначчи.*/

function* fib(n) {
    let prev = 0;
    let curr = 1;

    for (let i = 0; i < n; i++) {
        yield curr;

        let next = prev + curr;
        prev = curr;
        curr = next;
    }
}

let n = 10;
let resultArray = [];

let fibonacciGenerator = fib(n);
for (let num of fibonacciGenerator) {
    resultArray.push(num);
}

console.log(`Результат второй задачи: ${resultArray}`);



/*Задача 3
========
Реализуйте итератор колоды карт (52 штуки) cardDeck. Каждая карта представлена в виде строки типа 2 Пик. При вызове функции next() будет представлена следующая карта. По окончании перебора всех элементов выбросить исключение StopIteration.*/

class CardDeck {
    constructor() {
        this.suits = ['Пики', 'Крести', 'Буби', 'Черви'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Валет', 'Дама', 'Король', 'Туз'];
        this.index = 0;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        if (this.index >= 52) {
            throw new Error('StopIteration');
        }

        const suit = this.suits[this.index % 4];
        const rank = this.ranks[Math.floor(this.index / 4)];
        const card = `${rank} ${suit}`;
        this.index++;
        return { value: card, done: false };
    }
}

const cardDeck = new CardDeck();
for (const card of cardDeck) {
    console.log(card);
}
