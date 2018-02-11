(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueSap = factory());
}(this, (function () { 'use strict';

function createStore(Vue) {
  var store = new Vue({ data: { subscriptions: {}, statics: {} } });
  Vue.prototype.$subscriptions = store.subscriptions;
  Vue.prototype.$statics = store.statics;
}

function hasProp(obj, prop) {
  if (obj.hasOwnProperty) {
    return obj.hasOwnProperty(prop);
  } else {
    return !!obj[prop];
  }
}

function definePublishedProperty(vm, key, obj) {
  var ss = vm.$subscriptions;
  vm.$set(ss, key, obj[key]);
  Object.defineProperty(vm, key, {
    get: function get() {
      return ss[key];
    },
    set: function set(newValue) {
      vm.$set(ss, key, newValue);
    }
  });
}

function defineSubscribedProperty(vm, key, obj) {
  var ss = vm.$subscriptions;
  Object.defineProperty(vm, key, {
    get: function get() {
      return ss[key];
    },
    set: function set(newValue) {
      vm.$set(ss, key, newValue);
    }
  });
}

function defineStaticProperty(vm, key, obj) {
  var ss = vm.$statics;
  var cid = vm.constructor.cid;
  if (!ss[cid]) {
    vm.$set(ss, cid, {});
  }
  if (!hasProp(ss[cid], key)) {
    vm.$set(ss[cid], key, obj[key]);
  }
  Object.defineProperty(vm, key, {
    get: function get() {
      return ss[cid][key];
    },
    set: function set(newValue) {
      vm.$set(ss[cid], key, newValue);
    }
  });
}

var mixin = {
  created: function created() {
    var _$options = this.$options,
        published = _$options.published,
        subscribed = _$options.subscribed,
        statics = _$options.statics;

    if (published) {
      for (var key in published) {
        definePublishedProperty(this, key, published);
      }
    }

    if (subscribed) {
      for (var _key in subscribed) {
        defineSubscribedProperty(this, _key, subscribed);
      }
      this.$forceUpdate();
    }

    if (statics) {
      for (var _key2 in statics) {
        defineStaticProperty(this, _key2, statics);
      }
      this.$forceUpdate();
    }
  }
};

var subscriptions = createStore(Vue);

var plugin = {
	install: function install(Vue) {
		Vue.mixin(mixin);
	}
};

if (window !== undefined && window.Vue) {
	plugin.install(window.Vue);
}

return plugin;

})));
