class DBSingleton {
  constructor() {
    this.orders = [{ id: 439631, order: { item: "pizza" } }];
    console.log("Constructor is called", this);

    //instance is a static variable so all other classes will access to instance static variable
    if (DBSingleton.instance == null) {
      DBSingleton.instance = this;
    }
    return DBSingleton.instance; //If the constructor is run from somewhere else, so when new keyword is used,we return instance which is the same instance everywhere in the entire app.
  }
  addOrder(newOrder) {
    const id = Math.floor(Math.random() * 1000000);
    this.orders.push({ id, order: newOrder });
  }
}

const singleton = new DBSingleton();
Object.freeze(singleton)//Allows us to disable adding properties/methods/objects on the singleton instance

module.exports = singleton;
