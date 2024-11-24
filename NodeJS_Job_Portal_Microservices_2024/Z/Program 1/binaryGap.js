function binaryGap(N) {
    // Convert the number to its binary representation
    const binary = N.toString(2);
    let maxGap = 0;
    let currentGap = 0;
    let counting = false;

    for (const bit of binary) {
        if (bit === '1') {
            if (counting) {
                // If we were counting, update maxGap
                maxGap = Math.max(maxGap, currentGap);
            }
            // Reset current gap count and start counting
            currentGap = 0; 
            counting = true; 
        } else if (counting) {
            // Count zeros only if we have started counting (after the first '1')
            currentGap++;
        }
    }

    return maxGap;
}

// Example usage
const number = 1041; // Binary: 10000010001
console.log(`The binary gap of ${number} is: ${binaryGap(number)}`);
