function findUnpairedElement(arr) {
    let unpaired = 0;
    
    // XOR all elements together
    for (let i = 0; i < arr.length; i++) {
        unpaired ^= arr[i];
    }
    
    return unpaired;
}

// Example usage
let A = [9, 3, 9, 3, 9, 7, 9];  // 7 is unpaired
console.log("Array:", A);
let unpairedElement = findUnpairedElement(A);
console.log("Unpaired element:", unpairedElement);
