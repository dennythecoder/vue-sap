
function hasProp(obj, prop){
  if(obj.hasOwnProperty){
    return obj.hasOwnProperty(prop);
  }else{
    return !!obj[prop];
  }
}

function definePublishedProperty(vm, key, obj){
  const ss = vm.$subscriptions;
  vm.$set(ss, key, obj[key]);
  Object.defineProperty(vm, key,{
    get: ()=> ss[key],
    set: (newValue)=> {vm.$set(ss, key, newValue);}
  });
}


function defineSubscribedProperty(vm, key, obj){
  const ss = vm.$subscriptions;
  Object.defineProperty(vm, key,{
    get:()=> ss[key],
    set:(newValue)=> { vm.$set(ss, key, newValue); }
  });
}

function defineStaticProperty(vm, key, obj){
  const ss = vm.$statics;
  const cid = vm.constructor.cid;
  if(!ss[cid]){
    vm.$set(ss, cid, {});
  }
  if(!hasProp(ss[cid], key)){
    vm.$set(ss[cid], key, obj[key]);
  }
  Object.defineProperty(vm, key,{
    get:()=>ss[cid][key],
    set:(newValue)=> {vm.$set(ss[cid], key, newValue);}
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
      this.$forceUpdate();
    }

    if(statics){
      for(let key in statics){
        defineStaticProperty(this, key, statics);
      }
      this.$forceUpdate();
    }
    
  }
};