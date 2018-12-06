
/**  
console.log(this); // {}
 function fn() {
    console.log(this);
}
//fn(); //OBject [global] {}
var bar = fn();
bar(); // Object [global] {}
*/
var person1 = {
    name: "Nissan",
    getName: function() {
        var closure = function() {
            console.log(this.name);
        }.bind(this);
        return closure();
    }
};
person1.getName(); // undefined
/**
var count = 1;
function fn() {
    this.count++;
    console.log(count);
}
fn.count = 7;
// fn();
fn();
fn(count);
console.log(fn.count);
 */

/**
function A() {
    var a = 1;
    this.b();
}
function b() {
    console.log(this.a);
}
A();
*/
/** 
var a = 2;
function A() {
    var a = 1; // 若改成this.a = a 则输出2
    function b() {
        console.log(a); 
    }
    b();
}
A(); // 1
 */

/** 默认绑定
var count = 0;
function fn() {
    this.count++; // this指向window对象中
    console.log(count);
}
fn.count = 2;
console.log(count); // 0
fn(); // 0
console.log(count); // 0
console.log(fn.count); // 2
 */

/**
var count = 0;
function fn() {
    count++;
    console.log(count);
}
fn.count = 3;
console.log(count); // 0
fn(); // 1
console.log(count); // 1
console.log(fn.count); // 3 
 */
/** 
var a = 2; // window的
function fn() {
    console.log(this.a);
    console.log(a);
}
var obj = {
    a: 1, // obj的
    fn: fn
}
obj.fn(); // 1
fn(); // undefined
*/
/**
var count = 2;
function fn() {
  this.count++;// this指向window
  //console.log(this.count);
}
//fn.count = 0;
fn();// 实际调用的是window.fn()
fn();
console.log(fn.count);// 0
console.log(fn(count));
console.log(count);// 2 实际调用的是window.count
 */
/** 
function fn(num) {
    console.log("fn:" + num);
    // record times
    this.count++; // 创建一个全局变量count但初始值为undefined
}
fn.count = 2;
var i;
for(i = 0; i < 10;i++) {
    if(i >5) {
        fn(i);
    }
}
console.log(fn.count); // 0
console.log(count); // NaN
*/
/** 隐式 绑定
var a = 2; // window的
function fn() {
    console.log(this.a);
    console.log(a);
}
var obj1 = {
    a: 1, // obj1的
    fn: fn
}
var obj2  = {
    a: 2,   // obj2的
    obj1: obj1
}
obj1.fn(); // 1、2
obj2.obj1.fn(); // 1、2 this指向最后一个调用该函数的对象 即obj1
fn(); // undefined?2、2
 */

/**
function fn1() {
    var a = 2;
    this.fn2(); // 以为this引用的是fn1的词法作用域
}
function fn2() {
    console.log(this.a);
}
fn1(); //
*/ 
/** 隐式绑定
 * var obj = {
 *     a: 1,
 *     fn: funciton() {
 *         console.log(this.a);
 *      }
 *  }
 *  obj.fn(); // 1
 */
/** 隐式绑定
 * var a = 2; // window的
 * function fn() {
 *     console.log(this.a);
 * }
 * var obj = {
 *     a: 1, // obj对象的
 *     fn: fn
 * }
 * obj.fn(); // 1
 */

/**
function cb(fn) {
    fn && fn();
  }
  function fn () {
    console.log(this.a);
  }
  var a = 2; // window的
  var obj = {
    a: 1,
    fn: fn
  };
  obj.fn(); // 1
  cb(obj.fn);// undefined？2
  // 若想访问的是obj的属性a 可采用显示绑定即 cb(obj.fn.bind(obj)); // 1
 */

/** 显示绑定
function fn() {
    console.log(this.a);
}
var a = 2; // window的
var obj = {a: 1};
fn.call(obj); // 1
 */
/**
function fn(age, name) {
    this.age = age;
    this.name = name;
    this.sayName = function() {
        console.log(this.name);
    }
}
var obj = new fn(21, "Yoyo");
console.log(obj.age); // 21 
console.log(obj.name); // Yoyo
obj.sayName(); // Yoyo
 */

