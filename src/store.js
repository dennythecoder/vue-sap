
function createStore(Vue){
  const store = new Vue({data:{subscriptions:{}, statics:{}}});
  Vue.prototype.$subscriptions = store.subscriptions;
  Vue.prototype.$statics = store.statics;
}

export default createStore;