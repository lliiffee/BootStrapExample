
var TemplateEngine = function(tpl, data) {
    // magic here ...
    var re = /<%([^%>]+)?%>/g;
while(match = re.exec(tpl)) {
    console.log(match);
}

};

var template = '<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>';
console.log(TemplateEngine(template, {
    name: "Krasimir",
    age: 29
}));
