
function hasProp(obj, prop){
  if(obj.hasOwnProperty){
    return obj.hasOwnProperty(prop);
  }else{
    return !!obj[prop];
  }
}


function defineProperty(vm, key){
  Object.defineProperty(vm, key,{
    get: ()=> ss[key],
    set: (newValue)=> {vm.$set(ss, key, newValue);}
  });
}

function defineReadOnlyProperty(vm, key){
  Object.defineProperty(vm, key,{
    get: ()=> ss[key],
    set: (newValue)=> { /* */ }
  });
}


function definePublishedProperty(vm, key, obj){
  const ss = vm.$subscriptions;
  vm.$set(ss, key, obj[key]);
  defineProperty(vm, key);
}


function defineSubscribedProperty(vm, key, obj){
  const ss = vm.$subscriptions;
  defineProperty(vm, key);
}

function defineStaticProperty(vm, key, obj){
  const cc = vm.constructor;
  if(!hasProp(cc, key)){
    vm.$set(cc, key, obj[key]);
  }
  Object.defineProperty(vm, key,{
    get:()=> cc[key],
    set:(newValue)=> {vm.$set(cc, key, newValue);}
  });
}

export default {
  created(){
    const { published, subscribed, statics } = this.$options;
    if(published){
      for(let key in published){
        definePublishedProperty(this, key, published);
      }
    }

    if(subscribed){
      for(let key in subscribed){
        defineSubscribedProperty(this, key, subscribed);
      }
    }

    if(statics){
      for(let key in statics){
        defineStaticProperty(this, key, statics);
      }
    }
    if(subscribed || statics){
      this.$forceUpdate();
    }
    
    
  }
};