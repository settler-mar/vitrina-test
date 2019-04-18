<template>
    <div>
        <h1>{{title}}</h1>
        <h2 v-if="sub_title">{{sub_title}}</h2>
        <span>отображено {{showCount}} из {{totalItem}} позиций</span>
        <div class="container">
          <div class="row">
            <app-item class="col-2" v-for="item in items" :item="item"></app-item>
          </div>
        </div>
        <button v-if="totalItem - showCount" v-on:click="showMore">Отобразить еще (скрыто {{ totalItem - showCount }})</button>
    </div>
</template>

<script>
import Item from './components/item.vue';

export default {
    data: function () {
      return {
        showCount: 6,
        countLoaded: 6,
      }
    },
    components: {
      'app-item' : Item
    },
    methods: {
      showMore(){
        this.showCount+=this.countLoaded;
        if(this.showCount>this.collection.length){
          this.showCount=this.collection.length;
        }
      }
    },
    computed: {
      totalItem(){
        return this.collection.length;
      },
      items(){
         return this.collection.slice(0,this.showCount);
      }
    }
}
</script>
