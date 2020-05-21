<template>
     <div class="page">
         <div class="tab">
             <span
                     v-for="(item,index) in tab" :key="index"
                     :class="{active: index == current}"
                     @click="tabTo(index)"
             >
                 {{item}}
             </span>
         </div>
         <div class="main">
             <swiper :options="swiperOption" ref="mySwiper">
                 <swiper-slide>
                     <tree ref="tree" :treeList="tree" :current="10000"  :dialog="false" :visble="tree_show"  @func="selectTree"></tree>
                 </swiper-slide>
                 <swiper-slide>
                         <div class="list">
                             <cube-scroll
                                     ref="scroll"
                                     :options="scrollOptions"
                                     :data="datalist"
                                     @pulling-up="onPullingUp">
                                 <div class="scrollwrap">
                                     <div class="recommend" v-show="datalist.length > 0">
                                         <ul class="list">
                                             <li v-for="(item,index) in datalist">
                                                 <h4>{{item.paper_title}}</h4>
                                                 <div class="info">
                                                     <span>{{item.paper_q_count}}道题</span>
                                                     <span>{{item.paper_size}}</span>
                                                 </div>
                                                 <span class="goTest" @click="goTest(item.paper_code_crc32,item.paper_title)">开始练习</span>
                                             </li>
                                         </ul>
                                     </div>
                                 </div>
                                 <div v-show="datalist.length < 1" class="noneData" >{{text.noneText}}</div>
                             </cube-scroll>
                         </div>
                 </swiper-slide>
             </swiper>

         </div>
         <foot/>
     </div>
</template>

<script>
    import tree from '@/components/tree.vue'
    import foot from '@/components/foot.vue'
    import {treeData , ZtPaperList} from '@/api';
    export default {
        name: "practice",
        data(){
            const _this = this;
          return {
              tab:["专题","真题"],
              tree:[],
              tree_show:true,
              current:0,
              only:false,
              swiperOption: {
                  resistanceRatio:0,
                  threshold:15,
                  touchAngle:20,
                  on:{
                      slideChange: function () {
                          _this.current = this.activeIndex;
                          if(!_this.only){
                              _this.renderItems(1,true);
                              _this.only = true;
                          }
                          console.log(_this.only);
                      }
                  }
              },
              datalist:[],
              text:{
                  noneText:""
              },
              scrollOptions: {
                  click: true,
                  bounce: false,
                  pullUpLoad: {
                      threshold: 100,
                      txt: {
                          more: '加载更多',
                          noMore: '没有更多的数据啦'
                      }
                  }
              },
              page: {
                  current: 1,
                  total: 1
              }
          }
        },
        created(){
            treeData(1,{type:2}).then((data)=>{
                this.tree = data;
            });
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        methods:{
            tabTo(index){
                this.current = index;
                this.swiper.slideTo(index);
            },
            selectTree(obj){
                this.$router.push({path:"/myTest",query:{id:obj.id,type:"node",name:obj.name}})
            },
            renderItems(type,first){
                if(first){
                    this.page.current = 1;
                }
                var aDate = {
                    page:this.page.current
                };
                ZtPaperList(type,aDate).then((data)=>{
                    if(first){
                        this.$refs.scroll.scrollTo(0,0,0);
                        this.datalist = data.data;
                        console.log(data.data)
                        this.initText();
                    }else{
                        this.datalist.push(...data.data);
                    }
                    if(data.data.length == 0){
                        this.$refs.scroll.forceUpdate();
                        return;
                    }
                    this.page.totle = data.total_page;
                    this.page.current ++;
                })
            },
            onPullingUp(){
                if(this.page.current == this.page.totle+1){
                    this.$refs.scroll.forceUpdate();
                }else{
                    this.renderItems(3);
                }
            },
            initText(){
                this.text.noneText = "无数据！";
            },
            goTest(id,name){
                this.$router.push({path:"/myTest",query:{id:id,type:"real",name:name}})
            }
        },
        components: {
            foot,
            tree
        }

    }
</script>

<style scoped lang="less">
    body {
        background: #fff;
    }
    .tab {
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 56px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
         span{
            display: block;
            height: 36px;
            line-height:36px;
            text-align: center;
            width: 40px;
            margin: 0 10px;
             border-bottom: 2px solid #fff;
            &.active{
                border-bottom: 2px solid #37aafd;
                color:#37aafd;
            }
        }
    }
    .main {
        padding-top: 56px;
    }

    .swiper-container {
        width: 100%;
        height: 100%;
    }

    .recommend {
        background-color: #fff;
        padding: 6px 15px;
        margin-top: 0px;
        .list > li{
            padding: 16px 0;
            border-bottom:1PX solid #e8e8e8;
            position: relative;
            .info{
                font-size: 14px;
                color:#919191;
                > span { margin-right: 10px; }

            }
            .goTest {
                position: absolute;
                right: 0;
                bottom:16px;
                font-size: 14px;
                color: #fff;
                background: #37aafd;
                padding: 6px 12px;
                border-radius: 3px;
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
</style>