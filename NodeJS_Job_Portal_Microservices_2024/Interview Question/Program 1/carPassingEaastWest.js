function passCar(A){
    let carsTravellingEast=0
    let passedCars=0
    
    for(let i=0;i<A.length;i++){
        if(passedCars>1000000000) return -1;
        if(A[i]==0) carsTravellingEast++;
        if(A[i]==1) passedCars+=carsTravellingEast;
    }
    return passedCars
}

const passCarArr=[0,1,0,1,1]
console.log("Car Passing",passCar(passCarArr))