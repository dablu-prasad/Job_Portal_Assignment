const text = "John 94194";

// Given the text on line 1, replace the space with underscore
console.log(text.replace(" ", "_"));

// Given the text on line 1, replace the first 94 with 00
console.log(text.replace("94", "00"));

// Given the text on line 1, replace all 94 characters with 00
console.log(text.replaceAll("94", "00"));

//How to separate the text on line 1 to two different strings without the space,so we get John and 94194 separately and place each of them into an array?
console.log(text.split(" "));

//How to separate each character of the text on line 1 and place them into an array?
console.log(text.split(""));
