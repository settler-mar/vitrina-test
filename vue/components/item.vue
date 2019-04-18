<template>
    <div>
        <img :src="'/images/product/'+item.img" class="item-img"/>
        <div class="item-footer">
          <div class='colors-wrap' v-if="item.colors">
            <div
               v-for="color in colorsArr(item.colors)"
               :style="'background:'+color+';'"
               ></div>
          </div>
          <div class="item-title">
            {{ item.name }}
          </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
        }
    },
    props:[
      'item'
    ],
    computed: {
      colorsArr(){
        return function(colors){
            return colors.split(',')
        };
      }
    }
}
</script>