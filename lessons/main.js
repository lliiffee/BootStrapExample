//lesson 6

// inherit() returns a newly created object that inherits properties from the
// prototype object p.  It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create)                // If Object.create() is defined...
        return Object.create(p);      //    then just use it.
    var t = typeof p;                 // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {};                  // Define a dummy constructor function.
    f.prototype = p;                  // Set its prototype property to p.
    return new f();                   // Use f() to create an "heir" of p.
}

//查看类属性
function classof(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

var o={};
console.log(classof(o));

var q={x:1,y:{z:[false,null,""]}};
var s=JSON.stringify(q);
var p=JSON.parse(s);

console.log(classof(q));
console.log(classof(s));
console.log(classof(p));
console.log(classof(eval(q)));

console.log("--->");
console.log(eval("("+s+");").x);

console.log("#####################################");

console.log(Array.prototype);
console.log($.prototype);
console.log($("#test").__proto__);
console.log($("#test").html());
var scope="global scope";

function checkScope()
{
	var scope="local scope";
	function f(){return scope;}
	return f;
}

console.log(checkScope()());

var aT1=function (){};
aT1.prototype={
	name:function(){console.log("im aT1");}
};

var at1 = new aT1();
at1.name();


 
function aT2(){  // no need new
	
	 // Use the inherit() function to create an object that inherits from the
    // prototype object defined below.  The prototype object is stored as
    // a property of this function, and defines the shared methods (behavior)
    // for all range objects.
    var r = inherit(aT2.prototype); 
    // Store the start and end points (state) of this new range object.
    // These are noninherited properties that are unique to this object.
    // Finally return the new object
    return r;
};
aT2.prototype={
	
	name:function(){console.log("im aT2");}
};

var at2 = aT2(); //need new to create
at2.name();


function Range(){console.log(this);} //需要 new , 这个方法用于初始化 this..
Range.prototype={ //这样重写  了  Rage 的原型，就没有了construtor 了  //可以  constructor =Rage; 解决
	name:function(){console.log("im A_t3");}
};

var at3 = new Range();
at3.name();
console.log(at3 instanceof Range);

function Ra(){}
console.log("Range.prototype.constructor:");
console.log(Range.prototype.constructor);
console.log("Ra.prototype.constructor:");
console.log(Ra.prototype.constructor);

var aQuery = function(selector, context) {
       return  new aQuery.prototype.init();
}
aQuery.prototype = {
    init: function() {
        return this;
    },
    name: function() {
        return this.age
    },
    age: 20
}

aQuery.prototype.init.prototype = aQuery.prototype;





aQuery.extend =aQuery.prototype.extend= function (){
var target = arguments[0] || {}, // 第一个参数是目标   
    i = 1, length = arguments.length, deep = false, options;   
  
    if (target.constructor == Boolean) {// 第一个参数是bool型的   
        deep = target;// 深度copy   
        target = arguments[1] || {};// target指向第二个参数   
        i = 2;   
    }   
  
    // target 是string 型的或？   
    if (typeof target != "object" && typeof target != "function")   
        target = {};   
  
    if (length == i) {// 只有一个参数？或deep copy 时，两个参数   
        target = this;// 目标为this   
        --i;   
    }   
  
    for (;i < length; i++)   
        if ((options = arguments[i]) != null)   
  
            for (var name in options) {   
                var src = target[name], copy = options[name];   
                if (target === copy)// 防止死循环   
                    continue;   
                // 深度copy处理，最深为元素   
                if (deep && copy && typeof copy == "object" && !copy.nodeType)   
                    target[name] = jQuery.extend(deep, src   
                            || (copy.length != null ? [] : {}), copy);   
                else if (copy !== undefined)// 直接copy   
                    target[name] = copy;   
  
            }   
  
    return target;   
 }

var a=aQuery.prototype.extend(  //定义
{   
    tt : function() {   
        console.log("定义成员方法");   
    }
}
);

var b=aQuery.extend(
{   
    test : function() {   
        console.log("定义类方法");   
    }
}
);

 /*
 虽然 javascript　没有明确的类的概念，但是用类来理解它，会更方便。
jQuery便是一个封装得非常好的类，比如我们用 语句　$("#btn1") 会生成一个 jQuery类的实例。
jQuery.extend(object);　为jQuery类添加类方法，可以理解为添加静态方法
jQuery.extend( target, object1, [objectN])用一个或多个其他对象来扩展一个对象，返回被扩展的对象

var settings = { validate: false, limit: 5, name: "foo" }; 
var options = { validate: true, name: "bar" }; 
jQuery.extend(settings, options);
结果：settings == { validate: true, limit: 5, name: "bar" }

上述的extend方法原型中的dest参数是可以省略的，如果省略了，则该方法就只能有一个src参数，而且是将该src合并到调用extend方法的对象中去
如： $.extend(src)

jQuery.fn.extend(object); 对jQuery.prototype进得扩展，就是为jQuery类添加“成员函数”。jQuery类的实例可以使用这个“成员函数”。
比如我们要开发一个插件，做一个特殊的编辑框，当它被点击时，便alert 当前编辑框里的内容。可以这么做：
$.fn.extend({          
     alertWhileClick:function() {            
           $(this).click(function(){                 
                  alert($(this).val());           
            });           
      }       
});       
$("#input1").alertWhileClick(); // 页面上为：    
$("#input1")　为一个jQuery实例，当它调用成员方法 alertWhileClick后，便实现了扩展，每次被点击时它会先弹出目前编辑里的内容。

 */
 console.log("3"); 
 
 console.log(aQuery().name()); 
 console.log(aQuery().tt()); 
 console.log(aQuery.test()); 
 //a.tt();
 console.log("5");
  
 console.log();
  console.log("6"); 
//aQuery.prototype.b.test();
//##############

 Functional.install();
 
function mapper(f)
{
	
	return function (a) {return map(a,f);};
}
 
var increment=function(x) {return x+1;};
var incrementer=mapper(increment);
console.log(incrementer([1,2,3,5]));

console.log(map('1+', [2, 3]));





