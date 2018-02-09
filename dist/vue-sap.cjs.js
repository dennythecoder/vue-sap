'use strict';

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

module.exports = plugin;
