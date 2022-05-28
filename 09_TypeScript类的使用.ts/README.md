# 09_TypeScript类的使用.ts

编程范式：面向对象编程(C++ Java) & 函数式编程(Javascript lisp)

面向对象的四大特性：抽象、封装、继承、多态

## 01_类的定义

在js中，我们可以直接用 `class` 关键字定义一个类：

```js
  class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    eating() {
      console.log(this.name + "is eating")
    }
  }
  const p = new Person("Ziu", 18)
  console.log(p.age)
  console.log(p.eating())
```

同样的代码，在ts中就会报错，原因是constructor函数中找不到this.name 与 this.age，我们需要在类内指定其有的内部变量类型：

```ts
  class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
    eating() {
      console.log(this.name + "is eating")
    }
  }
```

**要么在constructor前给内部变量初始化，要么用constructor传入的参数为变量初始化，ts不允许类内有未初始化的变量存在。**

## 02_类的继承

使用 `extends` 关键字可以通过继承来实现一个新的类，新的类的继承父类的所有属性，同时还可以拥有自己的属性。

```ts
  class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
    eating() {
      console.log(this.name + " is eating.")
    }
  }
  class Student extends Person {
    stuID: string = "0101"
    studying() {
      console.log(this.name + " is studying.")
    }
  }
  class Teacher extends Person {
    teacherID: string = "8080"
    teaching() {
      console.log(this.name + " is teaching.")
    }
  }
  const teacher = new Teacher("Ziu", 18)
  teacher.eating()
  teacher.teaching()
```

## 03_类的继承2

要在子类中使用构造函数 constructor，必须在其中调用 `super`，也即：要创建子类的实例，必须调用父类的构造函数。

* 要在子类中直接调用父类的属性，可以用 `super + 属性名`
* 在子类中可以调用父类的方法，也可以重写父类的方法

```ts
  class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
    eating() {
      console.log(this.name + " is eating.")
    }
  }
  class Student extends Person {
    stuID: string
    constructor(name: string, age: number, stuID: string) {
      super(name, age) // 必须写在第一行
      this.stuID = stuID
    }
    eating() {
      console.log("My id is: " + this.stuID)
      super.eating()
    }
    studying() {
      console.log(this.name + " is studying.")
    }
  }
  const student = new Student("Ziu", 18, "0101")
  student.eating()
```

在子类Student中，我们通过 `super` 给父类的构造函数传入了必要参数；我们重写了父类的 `eating()` 并且在新的 eating()` 中，调用了父类的 `eating()`

**注意，子类构造器中的super必须写在第一行**

## 04_类的多态

继承自同一父类的多个子类，在执行自身属性时表现出不同的形态，为多态。

**父类引用（类型）指向子类对象**，由于子类可以继承父类的方法，也可以重写父类的方法，当有多个子类对父类的同一个方法进行了不同的重写，我们再调用这些子类时，会产生不同的结果。

```ts
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
```

目的是：写出通用性更强的代码。如果不使用多态，可以将makeAction写为函数的重载 / 联合类型

## 05_类的成员修饰符-private

在Java中有四种修饰符，在Ts中有三种修饰符：`public` `private` `protected`

* `public` 修饰的是在任何地方可见、公有的属性或方法，默认编写的属性就是public的
* `private` 修饰的是仅在一类中可见、私有的属性或方法
* `protected` 修饰的是仅在类自身及子类中可见、受保护的属性或方法

```ts
  class Person {
    public name: string
    private id: number
    constructor(name: string, id: number) {
      this.name = name
      this.id = id
    }
    getID() {
      console.log("My id is: " + this.id)
      return this.name
    }
    setID(id: number) {
      console.log("New id is: " + id)
      this.id = id
      return id
    }
  }

  const p = new Person("Ziu", 123456)
  console.log(p.name) // > Ziu
  // console.log(p.id) // 报错
  p.getID() // > My id is: 123456
  p.setID(654321) // > New id is: 654321
```

定义了 `private` 属性 `id`，要在外部直接通过 `.` 语法是拿不到的，必须通过 `public` 属性的方法 `getID()` 与 `setID()` 才能拿到它或修改它的值。

## 06_类的成员修饰符-protected

`protected`: 在类内部 / 子类中可以访问

```ts
  class Person {
    protected name: string = "Ziu"
  }

  class Student extends Person {
    getName() {
      return this.name
    }
  }
  const p = new Student()
  console.log(p.getName()) // > Ziu
```

## 07_属性的只读属性-readonly

只读属性可以在 `constructor` 中赋值，也可以在初始化时赋初值，但是后续不可以再修改。

```ts
  class Person {
    readonly name: string
    age: number
    readonly friend?: Person
    constructor(name: string, age: number, friend?: Person) {
      this.name = name
      this.age = age
      this.friend = friend
    }
  }
  const p = new Person("Ziu", 18, new Person("Chen", 19))
  // p.name = "ZIU" // 报错
  if (p.friend) {
    p.friend.age = 23
  }
  console.log(p)
```

**不能修改，指的是不能修改值本身**，但是如果标记为 `readonly` 属性的变量时一个对象，那么此对象中的属性是可以随意修改的。*相当于它的引用（指针）是不可以修改的，但是通过指针找到它内部的属性，是可以修改的*

## 08_getter-setter

在实际的开发中，我们使用getter/setter访问器，访问类中的私有属性（当私有属性很多时使用自己定义的会很麻烦）

```ts
  class Person {
    private _name: string
    constructor(name: string) {
      this._name = name
    }
    set name(newName: string) {
      this._name = newName
    }
    get name() {
      return this._name
    }
  }

  const p = new Person("Ziu")
  p.name = "ZiuChen" // 调用了 setter
  console.log(p.name) // 调用了 getter
```

## 09_类的静态成员

要在一个类中定义静态成员，要用 `static` 关键字。

要访问类的静态成员，不需要实例化一个类：

```ts
  class Student {
    static time: string = "20:00"
    static attendClass() {
      console.log("go to classroom.")
    }
  }

  console.log(Student.time) // > 20:00
  Student.attendClass() // > go to classroom.
```

## 10_抽象类abstract

我们知道，继承是多态使用的前提：

* 在定义很多通用接口时，我们通常会让调用者传入父类，通过多态来实现更灵活的调用方式
* 但是，父类可能不需要对某些方法进行具体的实现，所以父类中定义的方法，我们可以定义为抽象方法

```ts
  function mkArea(shape: Shape) {
    return shape.getArea()
  }

  abstract class Shape {
    abstract getArea(): number
  }

  class Rectangle extends Shape {
    private width: number
    private height: number
    constructor(width: number, height: number) {
      super()
      this.width = width
      this.height = height
    }
    getArea() {
      return (this.width * this.height) / 2
    }
  }

  class Round extends Shape {
    private radius: number
    constructor(radius: number) {
      super()
      this.radius = radius
    }
    getArea() {
      return Math.pow(this.radius, 2) * Math.PI
    }
  }

  const rec = new Rectangle(10, 20)
  const rnd = new Round(10)
  console.log(mkArea(rec)) // > 100
  console.log(mkArea(rnd)) // > 314.1592653589793
```

* 抽象方法只能在抽象类中定义
* 抽象方法可以只有函数声明，没有函数实现体。
* 抽象类中的抽象方法必须被子类实现，否则报错

## 11_类的类型

如题，类也可以作为一种类型，根据类创建对象。

```ts
  class Person {
    name: string = "Ziu"
  }

  const p1: Person = new Person()
  const p2: Person = {
    name: "ZiuChen"
  }
  const p3 = (p: Person) => {
    console.log(p.name)
  }
```