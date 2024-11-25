// Assignments for week end : 
//  1)  reverse any string with and without default methods
//   2)    [111,114,214,314,222,333] get the average of numbers ending with 4
//  3) input : welcome Output : w$E$l$C$o$M$e   
// 4)  Input : ' Hello world is beautiful' Get the alphabets count.

const input = "welcome";

// Transform the string
const output = input
  .split('') // Split the string into an array of characters
  .map((char, index) => 
    index % 2 === 0 ? char : char.toUpperCase() // Alternate capitalization
  )
  .join('$'); // Join with '$' as the separator

console.log(output); // Output: w$E$l$C$o$M$e
