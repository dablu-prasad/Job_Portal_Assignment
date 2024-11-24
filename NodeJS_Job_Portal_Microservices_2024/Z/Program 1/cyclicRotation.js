function cyclicRotation(arr, K) {
    let N = arr.length;
    
    // If the array is empty or has only one element, return the array as is
    if (N === 0 || N === 1) {
        return arr;
    }
    
    // Calculate the effective number of rotations
    K = K % N;
    
    // Rotate the array by slicing and concatenating
    return arr.slice(-K).concat(arr.slice(0, N - K));
}

// Example usage
let A = [1, 2, 3, 4, 5];
let K = 2;  // Rotate 2 times
console.log("Original array:", A);
let rotatedA = cyclicRotation(A, K);
console.log("Rotated array:", rotatedA);
