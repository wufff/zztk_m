<template>
  <div class="page">
  	 <div class="head">
         <div class="center-title">考研政治一刷到底</div>
  	 </div>
  	 <div class="main">
      <div class="list">
       <cube-scroll
          ref="scroll" 
          :options="options">        
  	 	    <div class="scrollwrap">
                <div class="bannerWrap">
                    <cube-slide :data="slideItems"/>
                </div>
               <div class="recommend">
                 <h3>
                   真题试卷
<!--                    <router-link to="/allpaper" tag="span" class="more">更多</router-link>-->
                 </h3>
                 <ul class="list">
                     <!--  <router-link :to="{path:'/paperDtail',query:{id:item.paper_code_crc32}}" tag="li" v-for="(item,index) in paper_list" :key="index">
                          <h4>{{item.paper_title}}</h4>
                          <div class="info">
                              <span>浏览：{{item.view_count}}</span>
                              <span>下载：{{item.download_count}}</span>
                          </div>
                          <span class="time">{{item.paper_creation_offset}}</span>
                      </router-link>      -->   
                      <li  v-for="(item,index) in paper_list" :key="index" @click="goDtial(item.id)">
                          <h4>{{item.paper_title}}</h4>
                          <div class="info">
                              <span>{{item.paper_q_count}}道题</span>
                          </div>
                      </li>                                                                                    
                 </ul>
               </div>             
          </div>
       </cube-scroll>  
  	  </div>
       <foot/>
     </div>

  </div>
</template>

<script>
// @ is an alias to /src
import foot from '../components/foot.vue'
import { indexApi } from '../api';
export default {
    name: 'home',
    data() {
        return {
            options: {
                click: true,
                bounce: false
            },
            slideItems: [],
            paper_list: []
        }
    },
    created() {
        indexApi(1, {}).then(res => {
            this.slideItems = res.banner_list.map(function (item) {
                return {
                    url:item.url,
                    image:item.cover_imge
                }
            });
            this.paper_list =  res.paper_list;
            console.log(this.paper_list)
        })
    },
    methods: {
        goDtial(id) {
            this.$router.push({path: "/paperDtail", query: {id: id}})
        }
    },
    computed: {

    },
    components: {
        foot
    }
}
</script>
<style scoped lang="less">
    .main {
       padding-top: 50px;
    }
   .bannerWrap {
       height: 150px;
       overflow: hidden;
   }
    .youxiang {
        width: 48px;
        height: 40px;
        display: inline-block;
        .text {
           font-size: 12px;
        }
    }
   .goVip {
   	   height: 34px;
   	   color:#7f5010;
   	   line-height: 35px;
   	   padding:0 15px;
   	   background:url("../assets/arrow_right_z.png") no-repeat #dcaf72 97% 11px;
   	   background-size:6px 10px;
   	   .vipImg { 
          width: 16px;
          height: 14px;
   	    }
   }
   .nav { 
   	  width: 100%;
   	  padding: 30px 15px 20px 15px;
   	  background-color: #fff;
   	  margin-bottom: 9px;
   	  > div {
   	  	 float: left;
   	  	 width: 33.33%;
   	  	 text-align: center;
   	  	 img {
   	  	 	 width: 38px;
   	  	 	 height: 38px;
   	  	 	 margin-bottom: 17px;
   	  	 }
   	  	 .name { 
               font-size: 14px;
               // font-weight: bold;
               color:#000000;
   	  	  }
   	  }
   }


   .recommend {
   	 background-color: #fff;
   	 padding: 6px 15px;
   	 .more {
   	 	 font-size: 15px;
   	 	 color:#5e5e5e;
   	 }
     .list > li{
        padding: 16px 0;
        border-bottom:1PX solid #e8e8e8; 
        position: relative;
        .info{
           font-size: 14px;
           color:#919191;
           > span { margin-right: 10px; }
          
        }
        .time {
             position: absolute;
             right: 0;
             bottom:16px;
              color:#919191;
              font-size: 14px;
           }        
     }
   }







   //下拉框
  .selectBox {
      width: 100%;
      height: 100%;
       position: fixed;
       left:0;
       right:0;
       top:0;
       z-index: 90;
       background-color: rgba(0,0,0,0.5);
       padding-top: 53px;
       .list {
          width: 100%;
          height: 100%;
          background: #fff;
       }
       .item {
          h5 {
             height: 35px;
             line-height: 35px;
             margin-bottom: 5px;
          }
          .inner {
            span {
               float: left;
               margin-right: 10px;
               margin-bottom: 10px;
               width: 78px;
               height: 33px;
               line-height: 36px;
               display: block;
               text-align: center;
               background-color: #f1f1f1;
               font-size: 14px;
               &.active {
                  background-color: #37aafd;
                  color:#fff;
               }
            }
          }
       }
       .content {
          background-color: #fff;
          padding: 15px 0px 4px 15px;
          height: 100%;
          h6 {
             font-size: 15px;
             color:#000;
             height: 44px;
             line-height: 44px;
          }
          ul{
             width: 360px;
             margin-bottom: 3px;
          }
          li {
             float: left;
             width: 76px;
             height: 35px;
             line-height: 35px;
             text-align: center;
             background-color: #f1f1f1;
             margin-right: 14px;
             margin-bottom: 14px;
          }
         
       }

  }
   


</style>
