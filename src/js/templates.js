define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["stats"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<span id="todo-count"><strong>' +
((__t = ( remaining )) == null ? '' : __t) +
'</strong> ' +
((__t = ( remaining == 1 ? 'item' : 'items' )) == null ? '' : __t) +
' left</span>\n<ul id="filters">\n\t<li>\n\t\t<a class="selected" href="#/">All</a>\n\t</li>\n\t<li>\n\t\t<a href="#/active">Active</a>\n\t</li>\n\t<li>\n\t\t<a href="#/completed">Completed</a>\n\t</li>\n</ul>\n';
 if ( completed ) { ;
__p += '\n<button id="clear-completed">Clear completed (' +
((__t = ( completed )) == null ? '' : __t) +
')</button>\n';
 } ;


}
return __p
};

this["JST"]["todos"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="view">\n\t<input class="toggle" type="checkbox" ' +
((__t = ( completed ? 'checked' : '' )) == null ? '' : __t) +
'>\n\t<label>' +
__e( title ) +
'</label>\n\t<button class="destroy"></button>\n</div>\n<input class="edit" value="' +
__e( title ) +
'">\n';

}
return __p
};

  return this["JST"];

});