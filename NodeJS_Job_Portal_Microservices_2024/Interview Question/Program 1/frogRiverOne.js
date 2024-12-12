function countElement(X, A) {
    let S = new Array(X).fill(0);  // Array to track leaves at positions 1 to X
    let remainingDistance = X;     // Number of positions still needing leaves

    // Loop through the array A to check where leaves fall
    for (let i = 0; i < A.length; i++) {
        let curLeafPos = A[i] - 1; // Subtract 1 to match 0-based array indexing
console.log("S[curLeafPos]",S[curLeafPos])
        // If it's the first time a leaf falls at this position
        if (S[curLeafPos] !== 1) {
            S[curLeafPos] = 1;     // Mark this position as covered
            remainingDistance--;   // One less position to cover

            // If all positions are covered, return the current time (index)
            if (remainingDistance === 0) return i;
        }
    }

    // If not all positions were covered, return -1
    return -1;
}

// Test case
const X = 5;
const A = [1, 3, 1, 4, 2, 3,7, 5,8, 4];
console.log("Earliest time:", countElement(X, A));   // Expected output: 6
