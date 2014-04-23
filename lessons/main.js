//lesson 6
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


var scope="global scope";

function checkScope()
{
	var scope="local scope";
	function f(){return scope;}
	return f;
}

console.log(checkScope()());



var aQuery = function(selector, context) {
      // return new aQuery();
};
aQuery.prototype = {
    name:function(){},
    age:function(){}
};

aQuery().name();




