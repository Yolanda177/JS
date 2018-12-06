**this是什么？**
  `this`是一个特殊的标识符关键字，其实就是一个引用，由在每个`function`中自动根据作用域确定指向此次调用的对象
  
**this怎么来的？**
  每调用一次JS函数时，都会创建一个对象，其中包括：传入哪些参数，函数如何调用，函数在哪里调用等等，该对象中一个重要的属性就是`this`引用，函数是哪个对象的方法，`this`就会自动绑定到该对象
  
**为什么要用this？**
 demo：
 ```
 function identify() {
    return this.name.toUpperCase();
 }
 function sayHello() {
     var greeting = "Hello I'm " + indentify.call(this);
 }
 var p1 = {
     name: "Kyle"
 };
 var p2 = {
     name: "Nochola"
 }
 identify.call(p1); // KYLE
 identify.call(p2); // NOCHOLA
 sayHello.call(p1); // Hello, I'm KYLE
 sayHello.call(p2); // Hello, I'm NOCHOLA
 ```
在不同的对象环境运行两个函数，在不用传入对应参数的情况下，实现了函数复用


**对this的误解**
 1. 误解一：this引用function本身
 demo:
 ```
 function fn(num) {
    console.log("fn:" + num);
    // record times
    this.count++; // 创建一个全局变量count但初始值为undefined
 }
 fn.count = 0;
 var i;
 for(i = 0; i < 10;i++) {
    if(i >5) {
        fn(i);
    }
 }
console.log(fn.count); // 0 不是4
console.log(count); // NaN
 ```

 2. 误解二：this引用的是function的词法作用域
 demo：
 ```
 function fn1() {
     var a = 2;
     this.fn2(); // 以为this引用的是fn1的词法作用域
 }
 function fn2() {
     console.log(this.a);
 }
 fn1(); // 报错
 ```
#### this机制的四种规则 ####
this绑定或引用的是哪个对象环境取决于函数被调用的地方。函数调用有不同的方式，在不同的方式中调用决定了this引用的是哪个对象。
**1. 默认绑定全局变量**
 最常见的是：当函数被单独定义和调用时，this就是绑定（或引用）全局变量
 demo：
 ```
 var a = 2; // window的
 // 直接打印
 console.log(this.a); // undefined?2

 // function函数直接调用
 function fn() {
     console.log(this.a);
 }
 
 fn(); // undefined?2

 // function函数赋给变量or作为回调函数调用
 var bar =  fn();
 bar(); // undefined?2

 // 自执行函数
 (function() {
     console.log(this.a)
 })(); // undefined?2
 ```

**2. 隐式绑定**
函数如果被某个obj对象拥有，且作为obj对象的方法被调用时，则函数里的this就是这个obj对象（即this绑定到obj对象）
 demo：
 ```
var a = 2; // window的
function fn() {
    console.log(this.a);
    console.log(a); // 打印的是window的
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

 // 或者
 var obj = {
     a: 1,
     fn: function() {
         console.log(this.a);
     }
 }
 obj.fn(); // 1 、2
 fn(); // undefined 、 2
 ```
特殊情况：在回调函数中
 demo：
 ```
 function cb(fn) {
     fn && fn();
 }
 function fn() {
     console.log(this.a);
 }
 var a = 2; // window的
 var obj = {
     a: 1, // obj的
     fn: fn
 };
 cb(obj.fn); // undefined？2

 // 或者 函数引用传递给变量
 function fn() {
     console.log(this.a);
 }
 var obj = {
     a: 1,
     fn: fn
 }
 var bar = obj.fn;
 var a = 2;
 bar(); // undefined?2

 ```
注意：此时的`fn`并不是直接作为`obj`对象的方法被调用，而是通过`obj`对象传入给函数`cb()`作为回调进行调用，即直接`fn()`调用了，触发了默认绑定到全局对象，`this`绑定到`window`对象中
若想让函数`fn()`访问`obj`对象的属性`a`可以采用`bind`绑定：
 ```
 function cb(fn) {
     fn && fn();
 }
 function fn() {
     console.log(this.a);
 }
 var a = 2; // window的
 var obj = {
     a: 1, // obj的
     fn: fn
 };
 cb(obj.fn.bind(obj)); // 1
 ```
**3. 显式绑定**
通过`call`和`apply`以及`bind`方法，将接受到的第一个参数绑定到this
 demo:
 ```
 function fn() {
     console.log(this.a);
 }
 var obj ={
     a: 1
 }
 fn.call(obj); // 1
 ```
注意，`call`和`apply`的区别是调用函数时，`call`参数的传入是一个个传，而`apply`是传入一个数组

**4. new绑定**
也就是创建一个新实例的过程：
 1. 创建一个新对象
 2. 将new函数的作用域赋给新对象（即新对象指向（绑定）到函数调用的this）
 3. 执行new函数中的代码
 4. 在这个函数没有返回其他对象时，那么函数调用会自动返回这个新对象

 demo：
 ```
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
 ```
**常见问题：**
1. 将对象的方法赋值给一个变量，并认为function中的this仍然指向原来的对象
    demo：
    ```
    var person1 = {
        name: "Nissan",
        getName: function() {
            console.log(this.name);
        }
    };
    var getPersonName = person1.getName;
    getPersonName(); // undefined
    console.log(getPersonName); // Function: getName

    // 若想指向原来的那个对象只需要添加bind方法
    var getPersonName = person1.getName.bind(peson1);
    getPersonName(); // Nissan
    console.log(getPersonName); // Function: bound getName
    ```
 首先找出当前执行的上下文，调用点是`getPersonName()`,只是一个普通的函数调用，看起来`getPersonName`似乎引用的是`person1.getName()`，实际上`getPersonName()`指向一个没有绑定到任何特定对象的普通函数`getName()`

 2. 将某个使用了`this`的方法作为回调函数
    demo:
    ```
    <button id="btn" type="button">查看姓名</button>
    // js部分
    var person1 = {
        name: "Nissan",
        getName: function() {
            console.log(this.name);
        }
    };
    var btn = document.getElementById("btn");
    btn.addEventListener("click", person1.getName); 

    ```
 虽然使用的是`person1.getName`,实际上和第一个类似，只是将`getName()`函数绑定到`button`对象，得到的是一个普通函数
 也就是说 当我们在某个对象上执行一个方法时，这个方法可能是在其他对象里面定义的，但此时的这个方法里的this不再指向原来的对象，而是调用该方法的新对象。同样我们可以用bind方法显式绑定，使this指向原来的`person1`对象

 3. 闭包中使用`this`
    demo:
    ```
    var person1 = {
        name: "Nissan",
        getName: function() {
            var closure = function() {
                console.log(this.name);
            };
            return closure();
        }
    };
    person1.getName(); // undefined
    ```
 因为闭包函数(即内部函数)不能访问外部函数的`this`变量，所以`this.name`等价于`window.name`，因为内部函数中的`this`绑定的是全局对象
 解决方法：
 1. 将`this`绑定到`getName()`函数上
    ```
    var person1 = {
        name: "Nissan",
        getName: function() {
            var closure = function() {
                console.log(this.name);
            }.bind(this);
            return closure();
        }
    };
    person1.getName(); // Nissan
    ```
 2. 先将`this`赋值给另一个变量，保留外部对象的引用
    ```
    var person1 = {
        name: "Nissan",
        getName: function() {
            var closure = function() {
                var self = this;
                console.log(self.name);
            };
            return closure();
        }
    };
    person1.getName(); // Nissan
    ```


