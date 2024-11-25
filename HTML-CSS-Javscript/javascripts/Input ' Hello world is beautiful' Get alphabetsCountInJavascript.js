// Assignments for week end : 
//  1)  reverse any string with and without default methods
//   2)    [111,114,214,314,222,333] get the average of numbers ending with 4
//  3) input : welcome Output : w$E$l$C$o$M$e   
// 4)  Input : ' Hello world is beautiful' Get the alphabets count.

const input = ' Hello world is beautiful';

// Count only alphabetic characters
const alphabetCount = input
  .split('') // Split the string into an array of characters
  .filter(char => /[a-zA-Z]/.test(char)) // Keep only alphabetic characters
  .length; // Count the remaining characters

console.log(alphabetCount); // Output: 21
