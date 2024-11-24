function maximalTripletProduct(A) {
    // Sort the array in ascending order
    A.sort((a, b) => a - b);

    let N = A.length;

    // The maximum product can either be:
    // 1. Product of the three largest elements (A[N-1], A[N-2], A[N-3])
    // 2. Product of the two smallest elements and the largest element (A[0], A[1], A[N-1])
    
    let product1 = A[N-1] * A[N-2] * A[N-3];
    let product2 = A[0] * A[1] * A[N-1];

    // Return the maximum of the two possible products
    return Math.max(product1, product2);
}

// Example usage:
let A = [-3, 1, 2, -2, 5, 6];
console.log("Maximal product of a triplet:", maximalTripletProduct(A));
