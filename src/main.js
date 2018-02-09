const plugin = {



	install(Vue){
		Vue.mixin({
			created(){
				if(this.subscribed){

				}
				if(this.published){


				}
			}
		});
	}
}
export default plugin;

if(global === window && window.Vue){
	plugin.install(window.Vue);
}