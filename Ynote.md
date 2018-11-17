JS中有两种不同数据类型的值：基本数据类型值和引用类型值。
五种基本数据类型：*Undefined*、*Null*、*Boolean*、*Number*、*String*，这五种基本数据类型是**按值访问**，即可直接操作保存在变量中实际的值。
>var num1 = 5;
var num2 = num1;
var num1 = 10;
console.log(num1);  //10
console.log(num2);  //5  不受num1的改变影响


引用类型的值是保存在内存中的对象，是**按引用访问**，即不允许直接访问内存中的位置，只能通过操作对象的引用而不是实际的对象。最常用的引用类型有*Object*类型和三个特殊的引用类型（也称基本包装类型）*Boolean*、*Number*和*String*

>var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Jason";
console.log(obj2.name);  //"Jason"
//这里的obj1和obj2都指向堆内存的同一个对象，对obj1操作时直接影响obj2

访问变量有按值传递和按引用传递两种，但函数的参数传递都是**按值传递**，即把函数外的值复制到函数内部。
>function cloneNum(num) {
    num += 10;      //num是函数cloneNum的一个局部变量
    return num;
}
var count = 20;
var res = cloneNum(count);
alert(count);  //输出20，虽作为参数传入到函数内进行运算，但不影响函数外部count的值，说明是按值传递参数，若是按引用则这里的count输出应是30
alert(res);  //输出30

以上是向参数传递基本类型值，以下向参数传递引用类型值

>function setName(obj) {
    obj.name = "Jason";
    obj = new Object();
    obj.name = "Miko";
}
var person = new Object();
setName(person);
alert(person.name);  //"Jason"
//如果是按引用传递，则person会修改成指向name属性值为"Miko"的新对象，这里应输出的是Miko，但输出仍然是Jason，说明 函数参数的传递都是按值传递





**对象**就是某个特定引用类型的实例，引用类型可以是原生类型的一种，也可以是自定义的类型

创建对象有三种模式：
1. 工厂模式
2. 构造函数模式
3. 原型模式

####1. 工厂模式

>function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        alert(this.name);
    };
    return o;
}
var p1 = createPerson("Jason", 21, "Software Engineer");
var p2 = createPerson("Yoyo", 20, "Teacher");
//createPerson函数每次都能返回一个包含三个属性，一个方法的对象

####2. 构造函数模式

>function Person(name, age, job) {  //构造方法以大写字母开头命名
    this.name = name;   //没有显示创建对象
    this.age = age;
    this.job = job;
    this.sayName = function() {
        alert(this.name);
    };  //没有return 语句
}
var p1 = createPerson("Jason", 21, "Software Engineer");
var p2 = createPerson("Yoyo", 20, "Teacher");

//构造函数可以创建特定类型的对象（解决了工厂模式的问题），可自定义对象类型的属性和方法


####3. 原型模式

>function Person() {
}
Person.prototype.name = "Jason";
Peson.prototype.age = 20;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    alert(this.name);
};
var p1 = new Person();
p1.sayName();  //"Jason"
var p2 = new Peson();
p2.sayName();  //"Jason"
alert(p1.sayName == p2.sayName);  //true 两个实例共享原型对象的属性和方法









创建一个Object实例，并添加了是三个属性，每个属性都对应一个值
>var person = new Object();
person.name = "Jason";
person.age = 29;
person.sendName = function() {
    alert(this.name);
}



属性类型：数据属性和访问器属性
1. 数据属性：有4个描述其行为的特性
-Configurable
-Enumerable
-Writable
-Value

用Object.defineProperty()方法，要修改属性默认的特性，接收三个参数：属性所在的对象，属性名，一个描述符对象；要定义多个属性，接收两个参数：要操作的对象，与对象中要修改或添加一一对应的属性

>var person = {};
Object.defineProperty(person, "name", {
    writable: false,    //导致这个属性不可修改
    value: "Jason"
});
alert(peson.name);  //"Jason"
person.name = "Greg";
alert(person.name);  //"Jason"
var book = {};
Object.defineProperty(book,{  //给book对象添加两个属性
    edition: {
        value: 1
    },
    year: {
        value: 2018
        }
    }
});

读取属性的特性用Object.getOwnPropertyDescriptor(),接收两个参数：操作的对象，要读取其描述符的属性名称；**返回值**是一个对象

>var book = {};
Object.defineProperty(book, {
    year: {
        value: 2018
    },
    edition: {
        value: 1
    }
});
var desc = Object.getOwnPropertyDescriptor(book, "year");
alert(desc.value);  //输出2014，说明方法返回值是一个对象

