
//Count the minimal number of frog jump from A to B and D
function frogJump(X,Y,D){
    let jumps=parseInt((Y-X)/D)
    if((Y-X)%D !=0 && (Y-X)>D) jumps++;
    return jumps;
}

console.log("Data",frogJump(10,85,30))