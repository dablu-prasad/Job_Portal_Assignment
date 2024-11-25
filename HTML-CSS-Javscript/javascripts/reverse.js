// Assignments for week end : 
//  1)  reverse any string with and without default methods
//   2)    [111,114,214,314,222,333] get the average of numbers ending with 4
//  3) input : welcome Output : w$E$l$C$o$M$e   
// 4)  Input : ' Hello world is beautiful' Get the alphabets count.

const str = "Hello, World!";
let reversedStr = "";

for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i];
}

console.log(reversedStr);