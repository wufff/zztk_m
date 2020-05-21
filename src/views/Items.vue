<template>
    <div class="page">
        <div class="head">
          <span class="moreBt" @click="showTree">
            <img src="../assets/more.png" alt="">
          </span>
            知识点： <span class="space"/>{{treeValue.name}}
        </div>
        <div class="filter clearfix">
            <div class="item"
                 v-for="(item,index) in selectData"
                 @click="selectTitle(index,item.id)"
                 :class="{active:selectValue == item.id}"
            >
                {{item.name}}
            </div>
        </div>
        <div class="main">
            <div class="list">
                <cube-scroll
                        ref="scroll"
                        :data="datalist"
                        :options="options"
                        @pulling-up="onPullingUp">
                    <div>
                    </div>
                    <div class="scrollwrap">
                        <div v-show="datalist.length < 1" class="noneData" v-html="text.noneText"></div>
                        <div class="test" v-for="(item,index) in datalist">
                            <div class="top" @click="showDtail(item.master_code_crc32)">
                                <div class="num">{{index+1}}.</div>
                                <div class="title" v-html="item.context"></div>
                                <!--  <div class="fj">
                                     <video src="http://images.dev.dodoedu.com/resource/4aaf30161bcff084.mp4"
                                         width="100%"
                                         height="180"
                                         controls>
                                     </video>
                                 </div> -->
                                <ul class="aswerbox"
                                    v-if="$local.getQ_Zh(item.qtp_code) == '单选题' || $local.getQ_Zh(item.qtp_code) == '多选题'">
                                    <li v-for="(item2,index2) in item.option">
                                        <div class="item-head">{{$local.ABC_Zh(index2)}}.</div>
                                        <div class="item-content" v-html="item2"/>
                                    </li>
                                </ul>
                            </div>
<!--                            <div class="bottom">-->
<!--                                <span class="type">{{$local.getQ_Zh(item.qtp_code)}}</span>-->
<!--                                <span>使用 {{item["usage_count"]}} 次</span>-->
<!--                            </div>-->
                        </div>
                    </div>
                </cube-scroll>
            </div>

        </div>
        <foot ref="foot"/>
        <tree ref="tree" :treeList="tree" :visble="tree_show" :current="treeValue.search_node" :dialog="true" @func="selectTree"></tree>
        <itemDtail ref="itemDtail" :data="itemOne"></itemDtail>
    </div>
</template>

<script>

// @ is an alias to /src
import foot from '@/components/foot.vue'
import tree from '@/components/tree.vue'
import itemDtail from '@/components/itemDtail.vue'
import {treeData,fitterData,items,additem,deleItems,ITEMDTAIL} from '@/api';
export default {
  name: 'items',
    data() {
        return {
            text: {
                noneText: ""
            },
            options: {
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
            datalist: [],
            selectData: [{name: "单选题", id: "QTP_OBJ_003"},{name: "多选题", id: "QTP_OBJ_004"},{name: "分析题", id: "QTP_SUB_006"}],
            selectValue:"QTP_OBJ_003",
            tree: [],
            tree_show: false,
            treeValue: {search_node: "", name: "全部"},
            itemOne: {},
            page: {
                current: 1,
                totle: 1
            },
            head_s: this.$local.fetch("head_s"),
        }
    },
  computed:{
     
  },
  created(){
    treeData(3).then((data)=>{
        data.unshift({search_node:"",name:"全部"});
        this.tree = data;
    });
    this.renderItems(1,true);
  },

  mounted(){

  },
  methods:{
     selectTitle(index,id){
        this.selectValue = id;
        this.renderItems(1,true)
     },
    showDtail(id){
      this.$refs.itemDtail.show();
      ITEMDTAIL(1,{master_code_crc32:id}).then((data)=>{
          this.itemOne = data[0];
          this.$refs.itemDtail.ready();
          console.log(data[0]);
          // console.log(this.itemOne);
      })
    },
    deletItem(obj){

    },    
    showTree(){
       this.tree_show =  !this.tree_show;
     },
    selectTree(obj){
         this.treeValue.name = obj.name;
         this.treeValue.search_node = obj.id;
         this.tree_show =false;
         this.renderItems(1,true)
    },
    renderItems(type,first){
         if(first){
             this.page.current = 1;
         }
       var aDate = {
          qtp_code:this.selectValue,
          know_node:this.treeValue.search_node,
          page:this.page.current
       };
       items(type,aDate).then((data)=>{
          if(first){
             this.$refs.scroll.scrollTo(0,0,0);
             this.datalist = data.data;
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
        this.text.noneText = "当前题型没有题！";
    }
  },
  components: {
     foot,
     tree,
     itemDtail
  }
}
</script>
<style scoped lang="less">

   .head {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
   }
   .add-img { 
        width: 11px;
        height: 11px;
        position: relative;
        top:1PX;
    }
   .add-img_y{
      width: 11px;
      height: 9px;
      margin-right: 3px;
   }

   .border-right{
      display: block;
      width: 1px;
      height: 20px;
      background: #e2e2e2;
      position: absolute;
      top: 11px;
      right:0; 
   }


   .filter {
      background-color: #fff;
      position: fixed;
      z-index: 98;
      top:50px;
      left: 0;
      right: 0;
      .down-img {
         width: 11px;
         height: 6px;
         position: relative;
         top:-2px;
         margin-left: 5px;
      }

      .item {
         height: 42px;
         line-height: 42px;
         float: left;
         width: 33.3333%;
         text-align: center;
         font-size: 15px;
         color:#000000;
         position: relative;
          &.active {
               color: #37aafd;
          }
      }
   }

   .main {
        padding-top: 92px;
     .list {
        // padding: 15px 0;
        height: 100%;
        width: 100%;
     }
   }


     .selectBox {
        width: 100%;
        height: 100%;
     }

   
</style>
