// rule 1
const obj_one = {
  name: "John",
  one() {
    console.log(this.name);
  },
};

obj_one.one();

// rule 2
const obj_two = {
  name: "Adam",
  two() {
    [1, 2].forEach(() => {
      console.log(this.name);
    });
  },
};

obj_two.two();

// rule 3
function three() {
  console.log(this);
}

three();

module.exports.student = "John";

//rule 4
console.log(this);

//rule 5
const arrowFunc = () => {
  console.log(this);
};

arrowFunc();
