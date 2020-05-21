<template>
     <ul class="foot">
         <router-link to="/" exact tag="li">
              <div class="icon icon-home"></div>
              <div class="name">首页</div>
         </router-link>   
         <router-link to="/items" tag="li">
              <div class="icon icon-items"></div>
              <div class="name">题库</div>
          </router-link>    
          <router-link to="/practice" tag="li">
              <div class="icon icon-cart"></div>
              <div class="name">练习</div>
          </router-link>  
          <router-link to="/my" tag="li">
              <div class="icon icon-my"></div>
              <div class="name">我的</div>
          </router-link>                                   
     </ul>
</template>
<script>
export default {
  name: 'foot',
  data() {
    return {

    }
  },
  created(){

  },
  computed:{

  },
  methods:{

  }
}
</script>

<style scoped lang="less">
   .foot {
       position: fixed;
       z-index: 80;
       bottom: 0;
       width: 100%;
       left: 0;
       right: 0;
       border-top: 1PX solid #f1f1f1;
       background-color: #fff;
      li {
         float: left;
         width: 25%;
         text-align: center;
         position: relative;
         .name { font-size: 11px; margin-bottom: 3px;color:#5e5e5e;}
         .icon { width: 26px;height:26px;background-repeat: no-repeat;background-size: contain;margin: 8px auto 3px auto;}
         .icon-home { background-image: url('../assets/home.png'); }
         .icon-items { background-image: url('../assets/items.png'); }
         .icon-cart { background-image: url('../assets/cart.png'); }
         .icon-my { background-image: url('../assets/my.png');}
         .num_num { top:3px;right: 18px;color:#fff; }
          &.router-link-active {
             .icon-home { background-image: url('../assets/home_a.png'); }
             .icon-items { background-image: url('../assets/items_a.png'); }
             .icon-cart { background-image: url('../assets/cart_a.png'); }
             .icon-my { background-image: url('../assets/my_a.png');}
             .name { color: #000000;font-weight: bold; }
          }         

      }
   }


</style>
