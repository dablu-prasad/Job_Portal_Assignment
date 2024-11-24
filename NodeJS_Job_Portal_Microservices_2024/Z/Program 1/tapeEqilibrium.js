function tapeEquilibrium(A) {
    const N = A.length;

    // Calculate the total sum of the array
    let totalSum = 0;
    for (let i = 0; i < N; i++) {
        totalSum += A[i];
    }

    // Initialize leftSum as 0 and rightSum as totalSum
    let leftSum = 0;
    let rightSum = totalSum;
    let minDifference = Infinity;

    // Iterate over the array and calculate the differences
    for (let i = 0; i < N - 1; i++) {
        leftSum += A[i];      // Add current element to leftSum
        rightSum -= A[i];     // Subtract current element from rightSum
        const currentDiff = Math.abs(leftSum - rightSum);
        minDifference = Math.min(minDifference, currentDiff);  // Update the minimum difference
    }

    return minDifference;
}

// Test case
const A = [3, 1, 2, 4, 3,4,5,6,6,7];
console.log("Tape Equilibrium Minimum Difference:", tapeEquilibrium(A));
