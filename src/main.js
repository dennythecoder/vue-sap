const plugin = {

	install(Vue){
		let ss = Vue.prototype.$Subscriptions = new Vue({data:{subscriptions:{}}}).subscriptions;

		Vue.mixin({
			created(){
				const p = this.$options.published;
				if(p){
					for(let key in p){
						Vue.set(ss, key, p[key]);
						Object.defineProperty(this, key,{
							get(){
								return ss[key];
							},
							set(newValue){
								Vue.set(ss, key, newValue);
							}
						});
					}
				}
				const s = this.$options.subscribed;
				if(s){
					for(let key in s){
						
						Object.defineProperty(this, key,{
							get(){
								return ss[key] || '';
							},
							set(newValue){
								Vue.set(ss, key, newValue);
							}
						});
					}
					this.$forceUpdate();
				}
			}
		});
	}
}


if(window !== undefined && window.Vue){
	plugin.install(window.Vue);
}

export default plugin;