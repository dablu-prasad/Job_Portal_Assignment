// Assignments for week end : 
//  1)  reverse any string with and without default methods
//   2)    [111,114,214,314,222,333] get the average of numbers ending with 4
//  3) input : welcome Output : w$E$l$C$o$M$e   
// 4)  Input : ' Hello world is beautiful' Get the alphabets count.

const numbers = [111, 114, 214, 314, 222, 333];

// Filter numbers ending with 4
const numbersEndingWith4 = numbers.filter(num => num % 10 === 4);

// Calculate the average
const average = numbersEndingWith4.reduce((sum, num) => sum + num, 0) / numbersEndingWith4.length;

console.log(average); // Output: 214