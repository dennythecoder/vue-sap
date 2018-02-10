(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueSap = factory());
}(this, (function () { 'use strict';

var plugin = {
	install: function install(Vue) {
		var ss = Vue.prototype.$Subscriptions = new Vue({ data: { subscriptions: {} } }).subscriptions;

		Vue.mixin({
			created: function created() {
				var _this = this;

				var p = this.$options.published;
				if (p) {
					var _loop = function _loop(key) {
						Vue.set(ss, key, p[key]);
						Object.defineProperty(_this, key, {
							get: function get() {
								return ss[key];
							},
							set: function set(newValue) {
								Vue.set(ss, key, newValue);
							}
						});
					};

					for (var key in p) {
						_loop(key);
					}
				}
				var s = this.$options.subscribed;
				if (s) {
					var _loop2 = function _loop2(key) {

						Object.defineProperty(_this, key, {
							get: function get() {
								return ss[key] || '';
							},
							set: function set(newValue) {
								Vue.set(ss, key, newValue);
							}
						});
					};

					for (var key in s) {
						_loop2(key);
					}
					this.$forceUpdate();
				}
			}
		});
	}
};

if (window !== undefined && window.Vue) {
	plugin.install(window.Vue);
}

return plugin;

})));
