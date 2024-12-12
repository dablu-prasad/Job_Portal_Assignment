let dog = {
  dog_name: "chicko",
  bark() {
    console.log(`${this.dog_name} says woof woof`);
  },
};

var func = dog.bark;
func = func.bind(dog);
setTimeout(func, 1000);
