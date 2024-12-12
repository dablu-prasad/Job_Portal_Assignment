let some = 20 / 5 * 2 + "9";

// What is the output below? and what type of value do we get?
console.log(some); //When operators in an expression have the same precedence, JavaScript evaluates the expression from left to right.So division and multiplication have the same precedence therefore 20 / 5 is calculated first and then 4 * 2 second and then 8 is concatenated with 9 giving us a string 89

let str = "Interview";

// How to reverse the str string?
// text.split will split each character in a string and then inserts each character into an array, we then reverse each character in the array using the built-in reverse method and join each character
console.log(str.split("").reverse().join(""));

//How to reverse the str variable above without using the built-in reverse, reduce method? You are not allowed to create a new variable to answer this question to have less space complexity.
for (let i = str.length - 1; i >= 0; i--) {
  str += str[i];
}

str = str.slice(str.length / 2);
console.log(str);

/* Create a function that takes an email as an input and returns true if email is valid or false if email is not valid. Make sure to check if:
    1) There is minimum 1 and maximum 30 characters including only letters between a-z lowercase and uppercase and numbers,underscores,hypens before the @ symbol in the email.
    
    2) There is minimum 1 and maximum 15 characters including only letters between a-z lowercase and uppercase and numbers,hypens in between the @ symbol and the last dot symbol in the email.

    3) There is minimum 2 and maximum 10 characters including only letters between a-z lowercase and uppercase after the last dot symbol in the email.

 */
function checkEmail(email) {
  /*
  ^[a-zA-Z0-9_-]{1,30} means allow letters between a-z lowercase and uppercase and numbers,underscores,hypens minimum 1 and up to 30 of these characters. ^ is a metacharacter, means all these characters must appear at the beginning of the string, email in this case

  @ means ,@ must come right after

  [a-zA-Z0-9-]{1,15} means allow letters between a-z lowercase and uppercase and numbers,hypens minimum 1 and up to 15 of these characters
  
  \. matches the dot so dot must come after, we escaped dot using a backslash because dot has special meaning in regular expression so we need to escape it after a character class(square brackets)

  [a-zA-Z]{2,10}$  means allow letters between a-z lowercase and uppercase minimum 2 letters and up to 10 letters following $ sign which is a metacharacter in regular expression means that the pattern right before $ sign must appear at the end of the string.
  */
  const emailReg = /^[a-zA-Z0-9_-]{1,30}@[a-zA-Z0-9-]{1,15}\.[a-zA-Z]{2,10}$/;
    return emailReg.test(email);
}

console.log(checkEmail("som_d-e@example.info"));


// What is the value and type of the variable 'a' below?
let a = 2 + "10" / 4; // division has a higher precedence than addition so first string 10 and number 4 is calculated, string 10 becomes a typeof number because we have division in between, in javascript when an arithmetic operation(except from +) is calculated involving strings and numbers, strings are converted to a number, so 10 / 4 = 2.5 + 2
console.log(a);
console.log(typeof a);

// What is the value and type of the variable 'b' below?
let b = 2 + "1" - 5; // + and - have the same precedence so we start from the left side concatenate 2 with 1 and get 21 and - 1 turns string 21 into a number so  21 - 5 = 16
console.log(b);
console.log(typeof b);

// What is the value and type of the variable 'c' below?
let c = 2 + "1" + 5; // 215 since we use only string and + so we concatenate numbers with string and get string
console.log(c);
console.log(typeof c);

// What is the value and type of the variable 'd' below?
let d = 6 + "10" * 6; // Multiplication has higher precedence than addition, so first, string 10 and  number 6 is calculated and since there is * in between string 10 becomes a number so  10 * 6 = 60 + 6
console.log(d);
console.log(typeof d);

// What is the value and type of the variable 'e' below?
let e = 6 + "10" % 3; // modulo operator has a higher precedence than addition so string 10 and modulo 3 is calculated first, 10 becomes a number and we get the remainder from the modulo that is 1 and 6 + 1 = 7 type of number
console.log(e);
console.log(typeof e);