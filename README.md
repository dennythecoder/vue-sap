# vue-sap


## State Management for Vue, the wrong way

In addition to being a plugin for Vue, this plugin attempts to answer questions about state management... poorly.  This library ignores the brilliance of flux architecture and decentralizes state (kinda).

The API's not fleshed out (of course), but maybe you can make sense of what's going on below.

#### The App

````javascript
    new Vue({
        el:'#app',
        published:{
            'msg':'Sweet Msg'
        }
    })
````

#### The Component

````javascript
export default {
    subscribed:{
        'msg':'msg' // what does this extra msg do?
    },
    template:`<h5>{{msg}}</h5>`

}

````

### Statics

Vue-Sap includes statics for components.  This can let you share and modify the same value... statics are usually frowned upon though... perhaps you shouldn't use them.

````javascript
export default{
    statics:{
        styleObj:{backgroundColor:'#aaa'}
    },
    methods:{
        onClick(){
        const so = this.styleObj;
        if(so.backgroundColor === 'red'){
            so.backgroundColor = 'blue';
        }else{
            so.backgroundColor = 'red';
        }
        }
    },
    template: `<div :style="styleObj" @click="onClick" style="width:40px; height:40px; border-radius: 20px 20px;"></div>`
}

````

#### The Output

##### Sweet Msg


Could you just centralize everything to the app using this?  Sure, I guess.

## Contributing

Feel free to contribute, create issues, create pull requests.  Just be friendly.

