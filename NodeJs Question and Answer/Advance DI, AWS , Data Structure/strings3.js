const text = "Hello world";

//How do we get the index of the second 'o' letter from the text above?

// indexOf built-in method gives us the index of the first occurrence of the letter 'o' , to get the second letter 'o' , we can use indexOf twice
const firstIndex = text.indexOf("o");

// Adding 1 allows us to start from the next position of the first letter 'o'
console.log(text.indexOf("o", firstIndex + 1));
