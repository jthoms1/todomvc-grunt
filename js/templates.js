this['JST'] = this['JST'] || {};

this['JST']['stats'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<span id="todo-count"><strong>'+
( remaining )+
'</strong> '+
( remaining == 1 ? 'item' : 'items' )+
' left</span>\n<ul id="filters">\n\t<li>\n\t\t<a class="selected" href="#/">All</a>\n\t</li>\n\t<li>\n\t\t<a href="#/active">Active</a>\n\t</li>\n\t<li>\n\t\t<a href="#/completed">Completed</a>\n\t</li>\n</ul>\n';
 if ( completed ) { 
;__p+='\n<button id="clear-completed">Clear completed ('+
( completed )+
')</button>\n';
 } 
;__p+='';
}
return __p;
};

this['JST']['todos'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="view">\n\t<input class="toggle" type="checkbox" '+
( completed ? 'checked' : '' )+
'>\n\t<label>'+
_.escape( title )+
'</label>\n\t<button class="destroy"></button>\n</div>\n<input class="edit" value="'+
_.escape( title )+
'">\n';
}
return __p;
};