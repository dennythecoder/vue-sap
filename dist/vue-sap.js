(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueSap = factory());
}(this, (function () { 'use strict';

var plugin = {
	install: function install(Vue) {
		Vue.mixin({
			created: function created() {
				
			}
		});
	}
};
if (global === window && window.Vue) {
	plugin.install(window.Vue);
}

return plugin;

})));
