import createStore from './store';
import mixin from './mixin';
const subscriptions = createStore(Vue);

const plugin = {
	install(Vue){
		Vue.mixin(mixin);
	}
};


if(window !== undefined && window.Vue){
	plugin.install(window.Vue);
}

export default plugin;