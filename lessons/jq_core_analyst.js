**  
 * author:prk  
 * date:2008-08-05  
 * comment:analeyse the core of jquery1.2.6  
 *     
 */  
  
/*  
 * jQuery  
 *   
 * @VERSION - New Wave Javascript  
 *   
 * Copyright (c) 2008 John Resig (jquery.com) Dual licensed under the MIT  
 * (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.  
 *   
 * $Date: 2008-07-24 01:00:32 +0800 (Thu, 24 Jul 2008) $ $Rev: 5793 $  
 */  
  
// Map over jQuery in case of overwrite   
var _jQuery = window.jQuery,   
// Map over the $ in case of overwriteff   
_$ = window.$;   
  
var jQuery = window.jQuery = window.$ = function(selector, context) {   
    // The jQuery object is actually just the init constructor 'enhanced'   
    return new jQuery.fn.init(selector, context);   
};   
  
// A simple way to check for HTML strings or ID strings   
// (both of which we optimize for)   
var quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,   
  
// Is it a simple selector   
isSimple = /^.[^:#\[\.]*$/,   
  
// Will speed up references to undefined, and allows munging its name.   
undefined;   
  
jQuery.fn = jQuery.prototype = {   
    init : function(selector, context) {   
        selector = selector || document;// 确定selector存在   
  
        // 第一种情况 Handle $(DOMElement)单个Dom 元素，忽略上下文   
        if (selector.nodeType) {   
            this[0] = selector;   
            this.length = 1;   
            return this;   
        }          
        if (typeof selector == "string") {//selector为string   
            // Are we dealing with HTML string or an ID?   
            var match = quickExpr.exec(selector);   
            // Verify a match, and that no context was specified for #id   
            if (match && (match[1] || !context)) {   
                if (match[1])// 第二种情况处理$(html) -> $(array)   
                    selector = jQuery.clean([match[1]], context);   
                else {// 第三种情况：HANDLE: $("#id")//处理$("#id")   
                    var elem = document.getElementById(match[3]);   
  
                    // Make sure an element was located   
                    if (elem) {   
                        // Handle the case where IE and Opera return items   
                        // by name instead of ID   
                        if (elem.id != match[3])   
                            return jQuery().find(selector);// 默认是document.find()   
  
                        // Otherwise, we inject the element directly into the   
                        // jQuery object   
                        return jQuery(elem);   
                    }   
                    selector = [];   
                }   
            } else  
                // 第四种情况：处理$(expr, [context])==$(content).find(expr)   
                return jQuery(context).find(selector);   
        } else if (jQuery.isFunction(selector))   
            // 第五种情况：处理$(function)七Shortcut for document ready   
            return jQuery(document)[jQuery.fn.ready ? "ready" : "load"](selector);   
  
        // 第六种情况：处理$(elements)   
        return this.setArray(jQuery.makeArray(selector));   
    },   
  
    // 当前的版本号   
    jquery : "@VERSION",   
  
    // jquery对象中的元素的个数。jquery像数组。能通过$('p')[0]去取得Dom对象。   
    size : function() {   
        return this.length;   
    },   
    // jquery对象的元素的个数   
    length : 0,   
  
    // 取到本jquery对象的第几个Dom元素，无参数，代表全部的Dom元素   
    get : function(num) {   
        return num == undefined ? jQuery.makeArray(this) : this[num];   
    },   
  
    // 采用jQuery构建新对象，同时引用老对象。   
    pushStack : function(elems) {   
        var ret = jQuery(elems);// 构建新的jquery对象   
        ret.prevObject = this;// 保存老的对象的引用   
        return ret;   
    },   
  
    // 把array-like对象的元素全部push当前jquery对象。   
    setArray : function(elems) {   
        this.length = 0;   
        Array.prototype.push.apply(this, elems);   
        return this;   
    },   
  
    // 当前jquery对象中每个元素都执行callback(index,elem)函数   
    each : function(callback, args) {// 返回this   
        // 其调用了jQuery的静态方法。prototype中的mothodize是解决这类问题的好方法   
        return jQuery.each(this, callback, args);   
    },   
  
    // 找到elem在本jquery对象的位置(index)   
    index : function(elem) {   
        var ret = -1;   
        return jQuery.inArray( // 如是jQuery对象就取第一个元素   
                elem && elem.jquery ? elem[0] : elem, this);   
    },   
  
    // attr(properties)   
    // 将“名/值”形式的对象设置为所有匹配元素的属性。   
    // attr(name)   
    // 取得第一个匹配元素的属性值。通过这个方法可以方便地从第一个匹配元素中获取一个属性的值。如果元素没有相应属性，则返回 undefined 。   
    // attr(key,value)   
    // 为所有匹配的元素设置一个属性值。$("img").attr("src","test.jpg");   
    // attr(key,fn)   
    // 为所有匹配的元素设置一个由这个函数计算的值做属性值。   
    attr : function(name, value, type) {   
        var options = name;// 支持"名/值"形式的对象和string   
        if (name.constructor == String)   
            if (value === undefined)   
                // 调用curCss,attr静态方法返回本对象第一个元素的name的属性值   
                return this[0] && jQuery[type || "attr"](this[0], name);   
            else {// 设定属性值，把name String 转换成"名/值"对象，便于统一的处理   
                options = {};   
                options[name] = value;   
            }   
        return this.each(function(i) {// 为每个元素的指定的name属性设值   
                    for (name in options)   
                        // value=options[name],可以是Fn(index),this-->each elem   
                        jQuery.attr(type ? this.style : this, name, jQuery   
                                .prop(this, options[name], type, i, name));   
                });   
    },   
  
    // css(name)   
    // 访问第一个匹配元素的样式属性。   
    // css(name,value)   
    // 在所有匹配的元素中，设置一个样式属性的值。数字将自动转化为像素值   
    // css(properties)   
    // 把一个“名/值对”对象设置为所有匹配元素的样式属性。这是一种在所有匹配的元素上设置大量样式属性的最佳方式。   
    css : function(key, value) {   
  
        if ((key == 'width' || key == 'height') && parseFloat(value) < 0)   
            value = undefined;// 忽略负数   
        return this.attr(key, value, "curCSS");// 调用了curCSS方法   
    },   
  
    // text()   
    // 取得所有匹配元素的内容。结果是由所有匹配元素包含的文本内容组合起来的文本。这个方法对HTML和XML文档都有效。   
    // text(val)   
    // 设置所有匹配元素的文本内容.与 html() 类似, 但将编码 HTML (将 "<" 和 ">" 替换成相应的HTML实体).   
    text : function(text) {   
        if (typeof text != "object" && text != null)   
            return this.empty()// 除去所有的子元素，加上创建的文本节点   
                    .append((this[0] && this[0].ownerDocument || document)   
                            .createTextNode(text));   
  
        var ret = "";   
        jQuery.each(text || this, function() {// 所有匹配元素包含的文本内容组合起来   
                    jQuery.each(this.childNodes, function() {   
                        if (this.nodeType != 8)// 8：注释   
                                ret += (this.nodeType != 1// 元素的话，递归子元素   
                                        ? this.nodeValue   
                                        : jQuery.fn.text([this]));   
                        });   
                });   
  
        return ret;   
    },   
  
    // *****************************************************************************   
    // 一组用于元素标签包裹操作的函数   
  
    // 将所有匹配的元素用单个元素包裹起来   
    // 这个函数的原理是检查提供的第一个元素并在它的代码结构中找到最上层的祖先元素－－这个祖先元素就是包装元素。   
    // 这于 '.wrap()' 是不同的，'.wrap()'为每一个匹配的元素都包裹一次。   
    wrapAll : function(html) {   
        if (this[0])   
            /*  
             * <p>Hello</p><p>cruel</p><p>World</p>。-->  
             * $("p").wrapAll("<div></div>");-->调用wrapAll的jQuery对象，称：A。有三个元素。  
             * 第一步:复制生成一个jQuery对象，称：B。得到：<div></div>的元素。  
             * 第二步：把B所有的元素都插在A[0]元素之前，得到<div></div><p>Hello</p><p>cruel</p><p>World</p>  
             * 第三步：找到B对象中所有元素的最内面的节点，如<div> </div>。称：inner Node;  
             * 第四步：向所有innerNode内部插入A对象的所有元素,得到<div><p>Hello</p><p>cruel</p><p>World</p></div>  
             */  
            jQuery(html, this[0].ownerDocument).clone().insertBefore(this[0])   
                    .map(function() {// 找到当前元素的最下层的子节点   
                        var elem = this;   
                        while (elem.firstChild)   
                            elem = elem.firstChild;   
                        return elem;   
                    }).append(this);// this指是调用wrapAll的jQuery对象。   
  
        return this;   
    },   
  
    // 将每一个匹配的元素的子内容(包括文本节点)用一个HTML结构包裹起来   
    wrapInner : function(html) {   
        return this.each(function() {// 这里包裹的对象是每个元素的对象的contents()   
                    jQuery(this).contents().wrapAll(html);   
                });   
    },   
  
    // 对于当前的jquery对象的每个元素都执行wrapAll(html)   
    wrap : function(html) {   
        return this.each(function() {// 这里包裹的对象是每个元素的对象   
                    jQuery(this).wrapAll(html);   
                });   
    },   
  
    // ************************************************************************   
  
    // ******************************************************************   
    // 该组方法主要是完成把元素插到什么地方，与Ext的DomHelp的功能相似。   
    // 在一个元素之前，之后，元素的开始，结束位置   
  
    // 向每个匹配的元素内部追加内容。   
    // 这个操作与对指定的元素执行appendChild方法，将它们添加到文档中的情况类似   
    append : function() {   
        return this.domManip(arguments, true, false, function(elem) {   
            if (this.nodeType == 1)   
                this.appendChild(elem);   
        });   
    },   
    // 向每个匹配的元素内部前置内容。   
    // 这是向所有匹配元素内部的开始处插入内容的最佳方式。   
    prepend : function() {// elem =arguments的转化集合中的dom元素   
        return this.domManip(arguments, true, true, function(elem) {   
            if (this.nodeType == 1)// this=jQuery对象的每个元素（对于tr之类会修正)   
                    this.insertBefore(elem, this.firstChild);   
            });   
    },   
  
    // 在每个匹配的元素之前插入内容。   
    before : function() {   
        return this.domManip(arguments, false, false, function(elem) {   
            this.parentNode.insertBefore(elem, this);// this=jQuery对象的每个元素   
            });   
    },   
  
    // 在每个匹配的元素之后插入内容   
    after : function() {   
        return this.domManip(arguments, false, true, function(elem) {   
            this.parentNode.insertBefore(elem, this.nextSibling);   
        });   
    },   
  
    // ******************************************************************   
  
    // 回到最近的一个"破坏性"操作之前。即，将匹配的元素列表变为前一次的状态。   
    end : function() {   
        return this.prevObject || jQuery([]);   
    },   
  
    // 搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的后代元素的好方法。   
    // 所有搜索都依靠jQuery表达式来完成。这个表达式可以使用CSS1-3的选择器语法来写。   
    find : function(selector) {   
        var elems = jQuery.map(this, function(elem) {// 找到每个元素的满足的   
                    return jQuery.find(selector, elem);   
                });   
  
        return this.pushStack(/[^+>] [^+>]/.test(selector) ? jQuery   
                .unique(elems) : elems);// 是不是返回不重复的元素？   
    },   
  
    // clone当前对象，events表明是否clone事件   
    clone : function(events) {   
        // 对每个元素都进行加工（copy)后的集合重新构建jQuery对象   
        var ret = this.map(function() {   
            if (jQuery.browser.msie && !jQuery.isXMLDoc(this)) {   
                // IE 中cloneNode不能copy 通过attachEvent增加的事件   
                // 而innserHTML不能copy一些修改过的属性（仅作为属性储存）如input 的name   
                var clone = this.cloneNode(true), container = document   
                        .createElement("div");   
                container.appendChild(clone);   
                return jQuery.clean([container.innerHTML])[0];   
            } else  
                return this.cloneNode(true);   
        });   
  
        // Need to set the expando to null on the cloned set if it exists   
        // removeData doesn't work here, IE removes it from the original as well   
        // this is primarily for IE but the data expando shouldn't be copied   
        // over in any browser   
        var clone = ret.find("*").andSelf().each(function() {   
            if (this[expando] != undefined)   
                this[expando] = null;   
        });   
  
        if (events === true)// clone所有事件   
            this.find("*").andSelf().each(function(i) {   
                if (this.nodeType == 3)   
                    return;   
                var events = jQuery.data(this, "events");   
  
                for (var type in events)   
                    for (var handler in events[type])   
                        jQuery.event.add(clone[i], type, events[type][handler],   
                                events[type][handler].data);   
            });   
  
        return ret;   
    },   
  
    // 筛选出与指定表达式匹配的元素集合。可以通过函数来筛选当前jQuery对象的   
    // 元素，还有通过用逗号分隔多个表达式来筛选   
    filter : function(selector) {// grep，multiFilter的综合   
        return this.pushStack(jQuery.isFunction(selector)   
                && jQuery.grep(this, function(elem, i) {   
                    return selector.call(elem, i);   
                }) || jQuery.multiFilter(selector, this));   
    },   
  
    // 删除与指定表达式匹配的元素   
    not : function(selector) {   
        if (selector.constructor == String)// 采用jQuery表达式   
            if (isSimple.test(selector))   
                return this.pushStack(jQuery.multiFilter(selector, this, true));   
            else  
                // 多表达式要过滤   
                selector = jQuery.multiFilter(selector, this);   
  
        var isArrayLike = selector.length// array-like的集合？   
                && selector[selector.length - 1] !== undefined   
                && !selector.nodeType;   
        return this.filter(function() {// 过滤掉return false的元素   
                    return isArrayLike ? jQuery.inArray(this, selector) < 0// this在selector中？   
                            : this != selector;   
                });   
    },   
  
    // 把与表达式匹配的元素添加到jQuery对象中。array(-like)的集合也可以追加进来   
    add : function(selector) {   
        return this.pushStack(jQuery.unique(jQuery.merge(this.get(),   
                typeof selector == 'string' ? jQuery(selector) : jQuery   
                        .makeArray(selector))));   
    },   
  
    // 用一个表达式来检查当前选择的元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。   
    is : function(selector) {   
        return !!selector && jQuery.multiFilter(selector, this).length > 0;   
    },   
  
    // 检查当前的元素是否含有某个特定的类，如果有，则返回true   
    hasClass : function(selector) {   
        return this.is("." + selector);   
    },   
  
    // 获得第一个匹配元素的当前值。   
    // 在 jQuery 1.2 中,可以返回任意元素的值了。包括select。如果多选，将返回一个数组，其包含所选的值。   
    // 设置每一个匹配元素的值。在 jQuery 1.2, 这也可以为select元件赋值   
    val : function(value) {   
        if (value == undefined) {   
  
            if (this.length) {   
                var elem = this[0];   
  
                if (jQuery.nodeName(elem, 'option'))   
                    return (elem.attributes.value || {}).specified   
                            ? elem.value   
                            : elem.text;   
  
                // We need to handle select boxes special   
                if (jQuery.nodeName(elem, "select")) {   
                    var index = elem.selectedIndex, values = [], options = elem.options, one = elem.type == "select-one";   
  
                    // Nothing was selected   
                    if (index < 0)   
                        return null;   
  
                    // Loop through all the selected options   
                    for (var i = one ? index : 0, max = one   
                            ? index + 1  
                            : options.length;i < max; i++) {   
                        var option = options[i];   
  
                        if (option.selected) {   
                            // Get the specifc value for the option   
                            value = jQuery(option).val();   
  
                            // We don't need an array for one selects   
                            if (one)   
                                return value;   
  
                            // Multi-Selects return an array   
                            values.push(value);   
                        }   
                    }   
  
                    return values;   
  
                    // Everything else, we just grab the value   
                } else  
                    return (this[0].value || "").replace(/\r/g, "");   
  
            }   
  
            return undefined;   
        }   
  
        if (value.constructor == Number)   
            value += '';   
  
        return this  
                .each(function() {   
                    if (this.nodeType != 1)   
                        return;   
  
                    if (value.constructor == Array   
                            && /radio|checkbox/.test(this.type))   
                        this.checked = (jQuery.inArray(this.value, value) >= 0 || jQuery   
                                .inArray(this.name, value) >= 0);   
  
                    else if (jQuery.nodeName(this, "select")) {   
                        var values = jQuery.makeArray(value);   
  
                        jQuery("option", this)   
                                .each(function() {   
                                    this.selected = (jQuery.inArray(this.value,   
                                            values) >= 0 || jQuery.inArray(   
                                            this.text, values) >= 0);   
                                });   
  
                        if (!values.length)   
                            this.selectedIndex = -1;   
  
                    } else  
                        this.value = value;   
                });   
    },   
  
    // 设置每一个匹配元素的html内容。这个函数不能用于XML文档。但可以用于XHTML文档。   
    // 取得第一个匹配的元素的html内容   
    html : function(value) {   
        return value == undefined ? (this[0] ? this[0].innerHTML : null) : this  
                .empty().append(value);// 去掉子节点，追加value   
    },   
  
    // 将所有匹配的元素替换成指定的HTML或DOM元素。   
    replaceWith : function(value) {   
        return this.after(value).remove();// this.after(value),this没有变   
    },   
    // 获取第N个元素 。这个元素的位置是从0算起。   
    eq : function(i) {   
        return this.slice(i, +i + 1);   
    },   
  
    // 代理数组的slice,同样的操作。   
    slice : function() {   
        return this.pushStack(Array.prototype.slice.apply(this, arguments));   
    },   
  
    // 对于当前jquery对象中每个元素都进行callback（i,elem)的操作   
    // 返回新生成的jquery对象。   
    map : function(callback) {   
        return this.pushStack(jQuery.map(this, function(elem, i) {   
            return callback.call(elem, i, elem);   
        }));   
    },   
  
    // 把先前jQuery对象的所有元素加到当前的jQuery对象之中   
    andSelf : function() {   
        return this.add(this.prevObject);   
    },   
  
    // data(name,value)   
    // 在元素上存放数据，同时也返回value。   
    // 如果jQuery集合指向多个元素，那将在所有元素上设置对应数据。   
    // 这个函数不用建立一个新的expando，就能在一个元素上存放任何格式的数据，而不仅仅是字符串。   
  
    // data(name)   
    // 返回元素上储存的相应名字的数据，可以用data(name, value)来设定。   
    // 如果jQuery集合指向多个元素，那将只返回第一个元素的对应数据   
    data : function(key, value) {   
        var parts = key.split(".");   
        parts[1] = parts[1] ? "." + parts[1] : "";   
  
        if (value === undefined) {// 取值   
            // 这个特别的方法将会触发指定的事件类型上所有绑定的处理函数。但不会执行浏览器默认动作   
            var data = this.triggerHandler("getData" + parts[1] + "!",   
                    [parts[0]]);   
  
            if (data === undefined && this.length)   
                data = jQuery.data(this[0], key);   
  
            return data === undefined && parts[1] ? this.data(parts[0]) : data;   
        } else { // 设值   
            return this.trigger("setData" + parts[1] + "!", [parts[0], value])   
                    .each(function() {   
                        jQuery.data(this, key, value);   
                    });   
        }   
    },   
  
    // 在元素上移除存放的数据   
    // 与$(...).data(name, value)函数作用相反   
    removeData : function(key) {   
        return this.each(function() {   
            jQuery.removeData(this, key);   
        });   
    },   
  
    // Dom manipulate操作的函数，对于每个jQuery对象中元素都运行   
    // 由callback操作args转化成的Dom 元素集合的函数。   
    domManip : function(args, table, reverse, callback) {   
        var clone = this.length > 1, elems;   
  
        // 对当前的jquery对象中每个元素都进行操作   
        return this.each(function() {   
            if (!elems) {// 把args 转化为dom元素数组，追加的内容   
                    elems = jQuery.clean(args, this.ownerDocument);   
                    if (reverse)// 倒序   
                        elems.reverse();   
                }   
  
                var obj = this;   
  
                // Ie Table不兼容，要进行特殊处理   
                if (table && jQuery.nodeName(this, "table")// 当前元素是table?   
                        && jQuery.nodeName(elems[0], "tr"))// 要追加是tr?   
                    obj = this.getElementsByTagName("tbody")[0]// 没有tbody,创建追加   
                            || this.appendChild(this.ownerDocument   
                                    .createElement("tbody"));   
  
                var scripts = jQuery([]);   
  
                jQuery.each(elems, function() {   
                    // 长度大于1，就采用clone。取第一个元素，否则就是本元素   
                        var elem = clone ? jQuery(this).clone(true)[0] : this;   
  
                        // 执行所有 scripts 在所有的元素注入之后   
                        if (jQuery.nodeName(elem, "script"))   
                            scripts = scripts.add(elem);   
                        else {   
                            // 除去内部 scripts，同时保存起来， 为了之后的计算   
                            if (elem.nodeType == 1)   
                                scripts = scripts.add(jQuery("script", elem)   
                                        .remove());   
  
                            // 注册元素到document之中   
                            callback.call(obj, elem);   
                        }   
                    });   
  
                scripts.each(evalScript);   
            });   
    }   
};   
  
// Give the init function the jQuery prototype for later instantiation   
jQuery.fn.init.prototype = jQuery.fn;   
  
function evalScript(i, elem) {   
    if (elem.src) {// <script src.. 通过ajax调用了   
        jQuery.ajax( {   
            url : elem.src,   
            async : false,   
            dataType : "script"  
        });   
    } else {// 对于本地的，通过globalEval运行   
        jQuery   
                .globalEval(elem.text || elem.textContent || elem.innerHTML   
                        || "");   
    }   
    if (elem.parentNode)// 除去   
        elem.parentNode.removeChild(elem);   
}   
  
function now() {   
    return +new Date;   
}   
  
jQuery.extend = jQuery.fn.extend = function() {   
  
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
};   
  
var expando = "jQuery" + now(), uuid = 0, windowData = {},   
// exclude the following css properties to add px   
exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,   
// cache defaultView   
// defaultViewis generally a reference to the window object for the document   
defaultView = document.defaultView || {};   
  
jQuery.extend( {   
    noConflict : function(deep) {   
        window.$ = _$;   
  
        if (deep)   
            window.jQuery = _jQuery;   
  
        return jQuery;   
    },   
  
    // See test/unit/core.js for details concerning this function.   
        // Since 1.3 DOM methods and function like alert   
        // aren't supported. They return false on IE (#2968).   
        isFunction : function(fn) {   
            return fn instanceof Function;   
        },   
  
        // 判断是不是XMLDoc   
        isXMLDoc : function(elem) {   
            return elem.documentElement && !elem.body || elem.tagName   
                    && elem.ownerDocument && !elem.ownerDocument.body;   
        },   
  
        // Evalulates a script in a global context   
        // 在全局的范围eval 代码，也就是在<head></head>中   
        globalEval : function(data) {   
            data = jQuery.trim(data);   
  
            if (data) {   
                // Inspired by code by Andrea Giammarchi   
                // http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html   
                var head = document.getElementsByTagName("head")[0]   
                        || document.documentElement, script = document   
                        .createElement("script");   
  
                script.type = "text/javascript";   
                if (jQuery.browser.msie)   
                    script.text = data;   
                else  
                    script.appendChild(document.createTextNode(data));   
  
                // Use insertBefore instead of appendChild to circumvent an IE6   
                // bug. This arises when a base node is used (#2709).   
                head.insertBefore(script, head.firstChild);   
                head.removeChild(script);   
            }   
        },   
  
        // 判断elem的nodeName是否存在   
        nodeName : function(elem, name) {   
            return elem.nodeName   
                    && elem.nodeName.toUpperCase() == name.toUpperCase();   
        },   
  
        cache : {},   
  
        data : function(elem, name, data) {   
            elem = elem == window ? windowData : elem;   
  
            var id = elem[expando];   
  
            // Compute a unique ID for the element   
            if (!id)   
                id = elem[expando] = ++uuid;   
  
            // Only generate the data cache if we're   
            // trying to access or manipulate it   
            if (name && !jQuery.cache[id])   
                jQuery.cache[id] = {};   
  
            // Prevent overriding the named cache with undefined values   
            if (data !== undefined)   
                jQuery.cache[id][name] = data;   
  
            // Return the named cache data, or the ID for the element   
            return name ? jQuery.cache[id][name] : id;   
        },   
  
        removeData : function(elem, name) {   
            elem = elem == window ? windowData : elem;   
  
            var id = elem[expando];   
  
            // If we want to remove a specific section of the element's data   
            if (name) {   
                if (jQuery.cache[id]) {   
                    // Remove the section of cache data   
                    delete jQuery.cache[id][name];   
  
                    // If we've removed all the data, remove the element's cache   
                    name = "";   
  
                    for (name in jQuery.cache[id])   
                        break;   
  
                    if (!name)   
                        jQuery.removeData(elem);   
                }   
  
                // Otherwise, we want to remove all of the element's data   
            } else {   
                // Clean up the element expando   
                try {   
                    delete elem[expando];   
                } catch (e) {   
                    // IE has trouble directly removing the expando   
                    // but it's ok with using removeAttribute   
                    if (elem.removeAttribute)   
                        elem.removeAttribute(expando);   
                }   
  
                // Completely remove the data cache   
                delete jQuery.cache[id];   
            }   
        },   
  
        // 对object中的每个对象都执行callback函数进行处理。args仅仅内部用   
        each : function(object, callback, args) {   
            var name, i = 0, length = object.length;   
            // 和else的处理差不多，args的传参代替object的属性值   
            if (args) {   
                if (length == undefined) {   
                    for (name in object)   
                        if (callback.apply(object[name], args) === false)   
                            break;   
                } else  
                    for (;i < length;)   
                        if (callback.apply(object[i++], args) === false)   
                            break;   
  
                // A special, fast, case for the most common use of each   
            } else {   
                // 不是array-like的object，对每个属性进行callback函数的调用   
                if (length == undefined) {   
                    for (name in object)   
                        if (callback.call(object[name], name, object[name]) === false)   
                            break;   
                } else  
                    // array-like object,采用数组的形式来处理   
                    for (var value = object[0];i < length   
                            && callback.call(value, i, value) !== false; value = object[++i]) {   
                    }   
            }   
  
            return object;   
        },   
  
        // 根据指定元素(elem)的指定的name来修正value值，如加px,exec Fn.   
        prop : function(elem, value, type, i, name) {   
            if (jQuery.isFunction(value))// value=Fn   
                value = value.call(elem, i);// 得到Fn的返回value   
            // 对于element的style中CSS属性，对需要加上单位的加上px单位   
            return value && value.constructor == Number && type == "curCSS"  
                    && !exclude.test(name) ? value + "px" : value;   
        },   
  
        // 一组内部使用的Class操作函数   
        className : {   
            // 为元素增加classNameS   
            add : function(elem, classNames) {// 多个className,空格分开   
                jQuery.each((classNames || "").split(/\s+/),   
                        function(i, className) {   
                            if (elem.nodeType == 1  
                                    && !jQuery.className.has(elem.className,   
                                            className))   
                                elem.className += (elem.className ? " " : "")   
                                        + className;   
                        });   
            },   
  
            // 为元素除去classNames   
            remove : function(elem, classNames) {   
                if (elem.nodeType == 1)// 元素   
                    elem.className = classNames != undefined ? jQuery.grep(   
                            elem.className.split(/\s+/), function(className) {// 过滤   
                                return !jQuery.className.has(classNames,   
                                        className);   
                            }).join(" ") : "";   
            },   
  
            // 元素有没有className?   
            has : function(elem, className) {   
                return jQuery.inArray(className, (elem.className || elem)   
                        .toString().split(/\s+/)) > -1;   
            }   
        },   
  
        // 间隔改变elem的样式   
        swap : function(elem, options, callback) {   
            var old = {};   
            for (var name in options) {// 替换elem.style中的属性   
                old[name] = elem.style[name];   
                elem.style[name] = options[name];   
            }   
            // 执行回调   
            callback.call(elem);   
  
            // 重新换回原来的属性   
            for (var name in options)   
                elem.style[name] = old[name];   
        },   
  
        // 取得elem的name的属性值   
        css : function(elem, name, force) {   
            // 对元素的宽度高度修正   
            if (name == "width" || name == "height") {   
                var val, props = {   
                    position : "absolute",   
                    visibility : "hidden",   
                    display : "block"  
                }, which = (name == "width" ? ["Left", "Right"] : ["Top",   
                        "Bottom"]);   
  
                function getWH() {// 求元素的实现高度，宽度   
                    val = name == "width"  
                            ? elem.offsetWidth   
                            : elem.offsetHeight;   
                    var padding = 0, border = 0;   
                    jQuery.each(which, function() {   
                        // paddinLeft,paddingRight   
                            padding += parseFloat(jQuery.curCSS(elem, "padding"  
                                    + this, true))   
                                    || 0;   
                            // borderTopWidth,borderBottomWith   
                            border += parseFloat(jQuery.curCSS(elem, "border"  
                                    + this + "Width", true))   
                                    || 0;   
                        });   
                    val -= Math.round(padding + border);   
                }   
  
                if (jQuery(elem).is(":visible"))   
                    getWH();   
                else  
                    // 元素看不到的情况下，绝对定位，取高度或宽度   
                    jQuery.swap(elem, props, getWH);   
  
                return Math.max(0, val);   
            }   
  
            return jQuery.curCSS(elem, name, force);   
        },   
  
        curCSS : function(elem, name, force) {   
            var ret, style = elem.style;   
  
            // elem的属性值被破坏   
            function color(elem) {   
                if (!jQuery.browser.safari)   
                    return false;   
  
                // 从defaultView 取   
                var ret = defaultView.getComputedStyle(elem, null);   
                return !ret || ret.getPropertyValue("color") == "";   
            }   
  
            // IE 中opacity 不兼容   
            if (name == "opacity" && jQuery.browser.msie) {   
                ret = jQuery.attr(style, "opacity");   
                return ret == "" ? "1" : ret;// 1是100%的显示   
            }   
  
            // Opera的display bug修正, 见 #2037   
            if (jQuery.browser.opera && name == "display") {   
                var save = style.outline;   
                style.outline = "0 solid black";   
                style.outline = save;   
            }   
  
            if (name.match(/float/i))// float是通过styleFloat取值的   
                name = styleFloat;   
  
            if (!force && style && style[name])   
                ret = style[name];// 取值   
            else if (defaultView.getComputedStyle) {// 看看defaultView的CSS   
  
                if (name.match(/float/i))   
                    name = "float";   
                // 转换成lamb,如addMethod变成add-method   
                name = name.replace(/([A-Z])/g, "-$1").toLowerCase();   
  
                var computedStyle = defaultView.getComputedStyle(elem, null);   
  
                if (computedStyle && !color(elem))   
                    ret = computedStyle.getPropertyValue(name);   
                else {// Safari没有正确地报道属性值，会提示none elements are involved   
                    var swap = [], stack = [], a = elem, i = 0;   
  
                    // Locate all of the parent display: none elements   
                    for (;a && color(a); a = a.parentNode)   
                        stack.unshift(a);   
  
                    // Go through and make them visible, but in reverse   
                    // (It would be better if we knew the exact display type   
                    // that they had)   
                    for (;i < stack.length; i++)   
                        if (color(stack[i])) {   
                            swap[i] = stack[i].style.display;   
                            stack[i].style.display = "block";   
                        }   
  
                    // Since we flip the display style, we have to handle that   
                    // one special, otherwise get the value   
                    ret = name == "display" && swap[stack.length - 1] != null  
                            ? "none"  
                            : (computedStyle && computedStyle   
                                    .getPropertyValue(name))   
                                    || "";   
  
                    // Finally, revert the display styles back   
                    for (i = 0;i < swap.length; i++)   
                        if (swap[i] != null)   
                            stack[i].style.display = swap[i];   
                }   
  
                // We should always get a number back from opacity   
                if (name == "opacity" && ret == "")   
                    ret = "1";   
  
            } else if (elem.currentStyle) {// 元素的currentStyle   
                var camelCase = name.replace(/\-(\w)/g, function(all, letter) {   
                    return letter.toUpperCase();   
                });   
  
                ret = elem.currentStyle[name] || elem.currentStyle[camelCase];   
  
                // From the awesome hack by Dean Edwards   
                // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291   
  
                // If we're not dealing with a regular pixel number   
                // but a number that has a weird ending, we need to convert it   
                // to pixels   
                if (!/^\d+(px)?$/i.test(ret) && /^\d/.test(ret)) {   
                    // Remember the original values   
                    var left = style.left, rsLeft = elem.runtimeStyle.left;   
  
                    // Put in the new values to get a computed value out   
                    elem.runtimeStyle.left = elem.currentStyle.left;   
                    style.left = ret || 0;   
                    ret = style.pixelLeft + "px";   
  
                    // Revert the changed values   
                    style.left = left;   
                    elem.runtimeStyle.left = rsLeft;   
                }   
            }   
  
            return ret;   
        },   
  
        // 把html转换成Dom元素,elems多个html string 的数组   
        clean : function(elems, context) {   
            var ret = [];   
            context = context || document;   
            // !context.createElement fails in IE with an error but returns   
            // typeof 'object'   
            if (typeof context.createElement == 'undefined')   
                // 处理context是jquery对象或数组的兼容。context可以是元素，或元素的集合，或空   
                context = context.ownerDocument || context[0]   
                        && context[0].ownerDocument || document;   
  
            jQuery   
                    .each(elems, function(i, elem) {   
                        if (typeof elem == 'number')   
                            elem += '';// 把int 转换成string的最高效的方法   
  
                        if (!elem)   
                            return;// 为''，undefined,false等时返回   
  
                        // 转换html为Dom元素   
                        if (typeof elem == "string") {   
                            // Fix "XHTML"-style tags in all browsers   
                            // 对于其它的标签，修改成xml的格式   
                            elem = elem   
                                    .replace(   
                                            /(<(\w+)[^>]*?)\/>/g,// front=(<(\w+)[^>]*?)   
                                            function(all, front, tag) {   
                                                return tag   
                                                        .match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)   
                                                        ? all   
                                                        : front + "></" + tag   
                                                                + ">";   
                                            });   
  
                            // 去空格，否则indexof可能会出不能正常工作   
                            var tags = jQuery.trim(elem).toLowerCase(), div = context   
                                    .createElement("div");   
                            // 有些标签必须是有一些约束的，比如<option>必须在<select></select>中间   
                            // 下面的代码在大部分是对<table>中子元素进行修正。数组中第一个元素为深度   
                            var wrap = !tags.indexOf("<opt")   
                                    && [1, "<select multiple='multiple'>",   
                                            "</select>"]   
                                    || !tags.indexOf("<leg")   
                                    && [1, "<fieldset>", "</fieldset>"]   
                                    || tags   
                                            .match(/^<(thead|tbody|tfoot|colg|cap)/)   
                                    && [1, "<table>", "</table>"]   
                                    || !tags.indexOf("<tr")   
                                    && [2, "<table><tbody>", "</tbody></table>"]   
                                    || (!tags.indexOf("<td") || !tags   
                                            .indexOf("<th"))   
                                    && [3, "<table><tbody><tr>",   
                                            "</tr></tbody></table>"]   
                                    || !tags.indexOf("<col")   
                                    && [2, "<table><tbody></tbody><colgroup>",   
                                            "</colgroup></table>"]   
                                    ||   
  
                                    // IE can't serialize <link> and <script>   
                                    // tags normally   
                                    jQuery.browser.msie   
                                    && [1, "div<div>", "</div>"] ||   
  
                                    [0, "", ""];   
  
                            // 包裹html之后，采用innerHTML转换成Dom   
                            div.innerHTML = wrap[1] + elem + wrap[2];   
  
                            while (wrap[0]--)   
                                // 转到正确的深度,对于[1, "<table>",   
                                // "</table>"]，div=<table>   
                                div = div.lastChild;   
  
                            // fragments去掉IE对<table>自动插入的<tbody>   
                            if (jQuery.browser.msie) {   
  
                                // Tag字符是<table>, *may*有伪造的 <tbody>   
                                var tbody = !tags.indexOf("<table")// <table开头   
                                        && tags.indexOf("<tbody") < 0// 但没有<tbody   
                                ? div.firstChild// 生成的元素中可能会自动加的<tbody>   
                                        && div.firstChild.childNodes :   
  
                                // String was a bare <thead> or <tfoot>   
                                        wrap[1] == "<table>"  
                                                && tags.indexOf("<tbody") < 0// 没有出现<tbody   
                                        ? div.childNodes// 没有加<tbody>   
                                                : [];   
                                // 除去<tbody>   
                                for (var j = tbody.length - 1;j >= 0; --j)   
                                    if (jQuery.nodeName(tbody[j], "tbody")   
                                            && !tbody[j].childNodes.length)   
                                        tbody[j].parentNode   
                                                .removeChild(tbody[j]);   
  
                                // IE completely kills leading whitespace when   
                                // innerHTML is used   
                                if (/^\s/.test(elem))   
                                    div.insertBefore(   
                                            context.createTextNode(elem   
                                                    .match(/^\s*/)[0]),   
                                            div.firstChild);   
  
                            }   
  
                            elem = jQuery.makeArray(div.childNodes);   
                        }   
  
                        if (elem.length === 0  
                                && (!jQuery.nodeName(elem, "form") && !jQuery   
                                        .nodeName(elem, "select")))   
                            return;   
  
                        if (elem[0] == undefined   
                                || jQuery.nodeName(elem, "form")   
                                || elem.options)   
                            ret.push(elem);   
  
                        else  
                            // 对于elems是array-like的集合   
                            ret = jQuery.merge(ret, elem);   
  
                    });   
  
            return ret;   
        },   
  
        // 为给定的elem的name属性设定value值   
        // 或取elem的name属性值   
        attr : function(elem, name, value) {   
            // 文本，注释节点不处理   
            if (!elem || elem.nodeType == 3 || elem.nodeType == 8)   
                return undefined;   
  
            var notxml = !jQuery.isXMLDoc(elem),   
            // 取值还是设值？   
            set = value !== undefined, msie = jQuery.browser.msie;   
  
            // 兼容的处理   
            name = notxml && jQuery.props[name] || name;   
  
            // Only do all the following if this is a node (faster for style)   
            // IE elem.getAttribute passes even for style   
            if (elem.tagName) {   
                var special = /href|src|style/.test(name);// 要特殊处理   
  
                // 对于safari的特殊处理   
                if (name == "selected" && jQuery.browser.safari)   
                    elem.parentNode.selectedIndex;   
  
                if (name in elem && notxml && !special) {// 通过DOM 0方式进入属性   
                    if (set) {// 改变属性   
                        // IE报错，type不能改变   
                        if (name == "type" && jQuery.nodeName(elem, "input")   
                                && elem.parentNode)   
                            throw "type property can't be changed";   
  
                        elem[name] = value;   
                    }   
  
                    // 对于attr(form,name)取是form[name].value   
                    if (jQuery.nodeName(elem, "form")   
                            && elem.getAttributeNode(name))   
                        return elem.getAttributeNode(name).nodeValue;   
                    // 返回元素的属性值   
                    return elem[name];   
                }   
                // 对style进行属性的操作   
                if (msie && notxml && name == "style")   
                    return jQuery.attr(elem.style, "cssText", value);   
  
                if (set)   
                    // IE会报错 see #1070   
                    elem.setAttribute(name, "" + value);   
  
                var attr = msie && notxml && special   
                // Some attributes require a special call on IE   
                        ? elem.getAttribute(name, 2)   
                        : elem.getAttribute(name);   
                // 不存在的属性返回null,改成undefined   
                return attr === null ? undefined : attr;   
            }   
  
            // 当elem参数是elem.style时。。。   
  
            // IE 使用 filters for opacity   
            if (msie && name == "opacity") {   
                if (set) {   
                    // IE opacity 要层的支持   
                    elem.zoom = 1;   
  
                    // 设 alpha filter 来设定 opacity   
                    elem.filter = (elem.filter || "").replace(/alpha\([^)]*\)/,   
                            "")   
                            + ((parseInt(value) + '' == "NaN"  
                                    ? ""  
                                    : "alpha(opacity=" + value * 100 + ")"));   
                }   
  
                return elem.filter && elem.filter.indexOf("opacity=") >= 0  
                        ? (parseFloat(elem.filter.match(/opacity=([^)]*)/)[1]) / 100)   
                                + ''  
                        : "";   
            }   
            // lamb字的支持   
            name = name.replace(/-([a-z])/ig, function(all, letter) {   
                return letter.toUpperCase();   
            });   
  
            if (set)   
                elem[name] = value;   
  
            return elem[name];   
        },   
  
        // trim(text)   
        trim : function(text) {   
            return (text || "").replace(/^\s+|\s+$/g, "");   
        },   
  
        // 把参数array转换成数组。有可能是dom collection,arguments，jquery对象   
        makeArray : function(array) {   
            var ret = [];   
  
            if (array != null) {   
                var i = array.length;   
                // the window, strings and functions also have 'length'   
                if (i == null || array.split || array.setInterval || array.call)   
                    ret[0] = array;   
                else  
                    while (i)   
                        ret[--i] = array[i];   
            }   
  
            return ret;   
        },   
  
        // 判断elem元素在array中的位置(index)   
        inArray : function(elem, array) {   
            for (var i = 0, length = array.length;i < length; i++)   
                // Use === because on IE, window == document   
                if (array[i] === elem)   
                    return i;   
            return -1;   
        },   
  
        // 把second 元素追加到first的数组中。   
        merge : function(first, second) {   
            // We have to loop this way because IE & Opera overwrite the length   
            // expando of getElementsByTagName   
            var i = 0, elem, pos = first.length;   
            // Also, we need to make sure that the correct elements are being   
            // returned   
            // (IE returns comment nodes in a '*' query)   
            if (jQuery.browser.msie) {   
                while (elem = second[i++])   
                    if (elem.nodeType != 8)   
                        first[pos++] = elem;   
  
            } else  
                while (elem = second[i++])   
                    first[pos++] = elem;   
  
            return first;   
        },   
  
        // 判断数组中的元素是否有重复的元素，返回不重复的所有元素。如Ext.DomQuery中的nodup一样处理   
        unique : function(array) {   
            var ret = [], done = {};   
  
            try {   
  
                for (var i = 0, length = array.length;i < length; i++) {   
                    var id = jQuery.data(array[i]);   
  
                    if (!done[id]) {   
                        done[id] = true;   
                        ret.push(array[i]);   
                    }   
                }   
  
            } catch (e) {   
                ret = array;   
            }   
  
            return ret;   
        },   
  
        // 过滤elems中满足callback处理的所有元素   
        grep : function(elems, callback, inv) {   
            var ret = [];   
  
            // Go through the array, only saving the items   
            // that pass the validator function   
            for (var i = 0, length = elems.length;i < length; i++)   
                if (!inv != !callback(elems[i], i))   
                    ret.push(elems[i]);   
  
            return ret;   
        },   
  
        // 返回对elems每个元素都进行操作的callback函数的返回值的集合。   
        map : function(elems, callback) {   
            var ret = [];   
  
            // Go through the array, translating each of the items to their   
            // new value (or values).   
            for (var i = 0, length = elems.length;i < length; i++) {   
                var value = callback(elems[i], i);   
  
                if (value != null)   
                    ret[ret.length] = value;   
            }   
  
            return ret.concat.apply([], ret);   
        }   
    });   
  
var userAgent = navigator.userAgent.toLowerCase();   
  
// 计算出浏览器的相关信息   
jQuery.browser = {   
    version : (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],   
    safari : /webkit/.test(userAgent),   
    opera : /opera/.test(userAgent),   
    msie : /msie/.test(userAgent) && !/opera/.test(userAgent),   
    mozilla : /mozilla/.test(userAgent)   
            && !/(compatible|webkit)/.test(userAgent)   
};   
  
var styleFloat = jQuery.browser.msie ? "styleFloat" : "cssFloat";   
  
jQuery.extend( {   
  
    // 支持不支持boxModel?IE不支持   
        boxModel : !jQuery.browser.msie || document.compatMode == "CSS1Compat",   
  
        props : {   
            "for" : "htmlFor",   
            "class" : "className",   
            "float" : styleFloat,   
            cssFloat : styleFloat,   
            styleFloat : styleFloat,   
            readonly : "readOnly",   
            maxlength : "maxLength",   
            cellspacing : "cellSpacing",   
            rowspan : "rowSpan"  
        }   
    });   
  
// 一组对元素的相关节点的操作，如父，子，兄节点等   
jQuery.each( {   
    parent : function(elem) {// 父亲节点   
            return elem.parentNode;   
        },   
        parents : function(elem) {// elem的所有parentNode   
            return jQuery.dir(elem, "parentNode");   
        },   
        next : function(elem) {// 元素的下一个兄弟   
            return jQuery.nth(elem, 2, "nextSibling");   
        },   
        prev : function(elem) {// 前一个兄弟   
            return jQuery.nth(elem, 2, "previousSibling");   
        },   
        nextAll : function(elem) {// 所有后继兄弟   
            return jQuery.dir(elem, "nextSibling");   
        },   
        prevAll : function(elem) {// 所有前继兄弟   
            return jQuery.dir(elem, "previousSibling");   
        },   
        siblings : function(elem) {// 所有兄弟   
            return jQuery.sibling(elem.parentNode.firstChild, elem);   
        },   
        children : function(elem) {// 所有孩子   
            return jQuery.sibling(elem.firstChild);   
        },   
        contents : function(elem) {// iframe?就是文档，或者所有子节点   
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument   
                    || elem.contentWindow.document : jQuery   
                    .makeArray(elem.childNodes);   
        }   
    }, function(name, fn) {// 注册到jQuery对象中去，可以调用同名方法   
            jQuery.fn[name] = function(selector) {   
                var ret = jQuery.map(this, fn);// 每个元素都执行同名方法   
                if (selector && typeof selector == "string")   
                    ret = jQuery.multiFilter(selector, ret);// 过滤元素集   
                return this.pushStack(jQuery.unique(ret));// 构建jQuery对象   
            };   
        });   
  
// 为jQuery对象生成appendTo~replaceAll五个代理函数   
// 其功能是把当前的jquery对象的每个元素都插入到每个传入的参数(元素）的一个位置：   
// 之前，之后，开始，结束,overwrite   
  
jQuery.each( {   
    appendTo : "append",   
    prependTo : "prepend",   
    insertBefore : "before",   
    insertAfter : "after",   
    replaceAll : "replaceWith"  
}, function(name, original) {   
    jQuery.fn[name] = function() {   
        var args = arguments;// 每个参数和每个元素是对应起来的   
        // 对当前jQuery中每个元素都进行的操作   
        return this.each(function() {   
            for (var i = 0, length = args.length;i < length; i++)   
                jQuery(args[i])[original](this);// 调用original代理工作   
            });   
    };   
});   
  
// 一组对元素attr,class等进行操作的函数   
jQuery.each( {   
    removeAttr : function(name) {// 除去元素的一个属性   
            jQuery.attr(this, name, "");   
            if (this.nodeType == 1)   
                this.removeAttribute(name);   
        },   
  
        addClass : function(classNames) {// 为元素增加一些classNames   
            jQuery.className.add(this, classNames);   
        },   
  
        removeClass : function(classNames) {// 除去元素的一些classNames   
            jQuery.className.remove(this, classNames);   
        },   
  
        toggleClass : function(classNames) {// 开关该class，   
            jQuery.className[jQuery.className.has(this, classNames)   
                    ? "remove"  
                    : "add"](this, classNames);   
        },   
  
        remove : function(selector) {// 根据selector除去元素，防内存泄露   
            if (!selector || jQuery.filter(selector, [this]).r.length) {   
                // Prevent memory leaks   
                jQuery("*", this).add([this]).each(function() {   
                    jQuery.event.remove(this);   
                    jQuery.removeData(this);   
                });   
                if (this.parentNode)   
                    this.parentNode.removeChild(this);   
            }   
        },   
        empty : function() {// 清除元素的所有子节点   
            // 删除当前对象的每个元素的的所有子节点，防止内存泄漏   
            jQuery(">*", this).remove();   
            while (this.firstChild)   
                // 删除余留的子节点   
                this.removeChild(this.firstChild);   
        }   
    }, function(name, fn) {   
        jQuery.fn[name] = function() {   
            return this.each(fn, arguments);   
        };   
    });   
  
// 为jQuery对象注册height,width方法   
jQuery   
        .each(   
                ["Height", "Width"],   
                function(i, name) {   
                    var type = name.toLowerCase();   
  
                    jQuery.fn[type] = function(size) {   
                        // window的宽度和高度   
                        return this[0] == window ? (// window的宽度和高度   
                                jQuery.browser.opera   
                                        && document.body["client" + name]   
                                        || jQuery.browser.safari   
                                        && window["inner" + name]   
                                        || document.compatMode == "CSS1Compat"  
                                        && document.documentElement["client"  
                                                + name] || document.body["client"  
                                        + name])   
                                : this[0] == document ? (// document的宽度和高度   
                                        Math   
                                                .max(   
                                                        Math   
                                                                .max(   
                                                                        document.body["scroll"  
                                                                                + name],   
                                                                        document.documentElement["scroll"  
                                                                                + name]),   
                                                        Math   
                                                                .max(   
                                                                        document.body["offset"  
                                                                                + name],   
                                                                        document.documentElement["offset"  
                                                                                + name])))   
                                        : (size == undefined ? (// 第一个元素的的宽度和高度   
                                                this.length ? jQuery.css(   
                                                        this[0], type) : null)   
                                                : (// 设定当前对象所有元素宽度和高度   
                                                this  
                                                        .css(   
                                                                type,   
                                                                size.constructor == String   
                                                                        ? size   
                                                                        : size   
                                                                                + "px")));   
                    };   
                });   
  
// Helper function used by the dimensions and offset modules   
function num(elem, prop) {   
    return elem[0] && parseInt(jQuery.curCSS(elem[0], prop, true), 10) || 0;   
}  