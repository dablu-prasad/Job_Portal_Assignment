let dog = {
  dog_name: "chicko",
  bark() {
    console.log(`${this.dog_name} says woof woof`);
  },
};

var func = dog.bark;
func = func.bind(dog);  // bind() method, an object can borrow a method from another object
                        // call() method, you can write a method that can be used on different objects.
                        // apply() method, you can write a method that can be used on different objects.
setTimeout(func, 1000);
