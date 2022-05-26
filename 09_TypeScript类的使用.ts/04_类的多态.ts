class Animal {
  action() {
    console.log("Animal action.")
  }
}

class Dog extends Animal {
  action() {
    console.log("Dog is running.")
  }
}

class Fish extends Animal {
  action() {
    console.log("Fish is swimming.")
  }
}

function MakeActions(animals: Animal[]) {
  animals.forEach((animal) => {
    animal.action()
  })
}

MakeActions([new Dog(), new Fish()])
