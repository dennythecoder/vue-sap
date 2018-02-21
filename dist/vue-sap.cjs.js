'use strict';

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

function defineProperty(vm, key) {
  var ss = vm.$subscriptions;
  Object.defineProperty(vm, key, {
    get: function get() {
      return ss[key].value;
    },
    set: function set(newValue) {
      vm.$set(ss[key], 'value', newValue);
    }
  });
}

function defineReadOnlyProperty(vm, key) {
  var ss = vm.$subscriptions;
  Object.defineProperty(vm, key, {
    get: function get() {
      return ss[key].value;
    },
    set: function set(newValue) {/* */}
  });
}

function definePublishedProperty(vm, key, obj) {
  var ss = vm.$subscriptions;
  vm.$set(ss, key, obj[key]);
  defineProperty(vm, key);
}

function defineSubscribedProperty(vm, key, obj) {
  var ss = vm.$subscriptions;
  if (ss[key]) {
    if (!ss[key].readOnly) {
      defineProperty(vm, key);
    } else {
      defineReadOnlyProperty(vm, key);
    }
  } else {
    var unwatch = ss.$watch(key, function () {
      defineSubscribedProperty(vm, key, obj);
      unwatch();
    });
  }
}

function defineStaticProperty(vm, key, obj) {
  var cc = vm.constructor;
  if (!hasProp(cc, key)) {
    vm.$set(cc, key, obj[key]);
  }
  Object.defineProperty(vm, key, {
    get: function get() {
      return cc[key];
    },
    set: function set(newValue) {
      vm.$set(cc, key, newValue);
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
    }

    if (statics) {
      for (var _key2 in statics) {
        defineStaticProperty(this, _key2, statics);
      }
    }
    if (subscribed || statics) {
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

module.exports = plugin;
