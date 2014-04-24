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
      // return new aQuery();
};
aQuery.prototype = {
    name:function(){},
    age:function(){}
};

//aQuery().name();


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





