function countDown(callback) {
  setTimeout(() => {
    callback("Countdown finished");
  }, 3000);
}

countDown((val) => console.log(val));


//A callback is a function that is passed to another function as an argument and called back from that function later on.