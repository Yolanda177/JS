/**
function Person() {
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    Person.prototype.sayName = function() {
        alert(this.name);
    };
}

var person1 = new Person();
var person2 = new Person();

console.log(person1.hasOwnProperty("name"));// false
console.log("name" in person1);// true


//取得对象上所有可枚举的实例属性，用ES5的Object.keys()方法,该方法返回一个包含所有可枚举属性的字符串数组
function Person() {
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    Person.prototype.sayName = function() {
        alert(this.name);
    };
}

var keys = Object.keys(Person.prototype);
console.log(keys);

var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.keys(p1);
console.log(p1keys);// ['name', 'age']
//该方法返回一个所有实例属性的字符串数组，无论是否可枚举
var keys2 = Object.getOwnPropertyNames(Person.prototype);
console.log(keys2);


String.prototype.startsWith = function (text) {
    return this.indexOf(text) == 0;
};
var msg = "Helllo world";
console.log(msg.startsWith("Helllo"));
 

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friend = ["Shelby", "Court"];
}
Person.prototype = {
    constructor: Person,
    sayName: function() {
        alert(this.name);
    }
}

var person1 = new Person("Nicholas", 29, "Software Enginner");
var person2 = new Person("Greg", 27, "Doctor");

person1.friend.push("Van");
console.log(person1.friend);// ['Shelby', 'Court', 'Van']
console.log(person2.friend);// ['Shelby', 'Court']
console.log(person1.friend === person2.friend);// false
console.log(person1.sayName === person2.sayName);// true


function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;

if (typeof this.sayName != "function") {
    Person.prototype.sayName = function(){
        console.log(this.name);
        };
    }
}
var friend = new Person("Nicholas", 29, "Software Enginner");
friend.sayName();


function SuperType() {
    this.property = true;
}
//给原型添加了一个方法，返回值为构造函数定义的属性值
SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}

//创建了一个SuperType实例，则SubType的原型对象继承了SubperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
    return this.subproperty;
};

var ins = new SubType();
console.log(ins.getSuperValue());

console.log(Object.prototype.isPrototypeOf(ins));// true
console.log(SuperType.prototype.isPrototypeOf(ins));// true
console.log(SubType.prototype.isPrototypeOf(ins));// true


function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
    return this.subproperty;
}
//重写超类型中的方法
SubType.prototype.getSuperValue = function() {
    return false;
};
//通过SubType的实例调用getSuperValue时调用的是重新定义的方法
var ins = new SubType();
console.log(ins.getSuperValue());// false
//通过SuperType的实例调用getSuperValue时调用的是原来的方法
var ins2 = new SuperType();
console.log(ins2.getSuperValue());// true



function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    return(this.name);
};

function SubType(name, age) {
    //继承属性
    SuperType.call(this, name);
    this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    return(this.age);
};

var ins1 = new SubType("Miko", 21);
ins1.colors.push("black");
console.log(ins1.colors);// ["red", "blue", "green", "black"]
console.log(ins1.sayName());// Miko
console.log(ins1.sayAge());// 21

var ins2 = new SubType("Greg", 22);
console.log(ins2.colors);// ["red", "blue", "green"]
console.log(ins2.sayName());// Greg
console.log(ins2.sayAge());// 22
*/


var person = {
    name: "Miko",
    friends: ["Shrlby", "Court", "Van"]
};
var anotherPerson = Object.create(person, {
    name: {
        value: "Nicholas"
    }
});
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object.create(person);  
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(anotherPerson.name);//Nicholas？为什么不是Greg
console.log(yetAnotherPerson.name);
 

/**
 *  function createAnother(original) {
    var clone = Object(original);
    clone.sayHi = function() {
        return ("HI");
    };
    return clone;
}
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
console.log(anotherPerson.sayHi());
 */
