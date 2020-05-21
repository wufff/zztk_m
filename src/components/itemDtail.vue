<template>
        <div class="detailPage"  v-show="readys" :class="{mHeight:!visble}">
            <div class="wrap" v-show="visble" >
                <div class="head">
              <span class="back" @click.stop="back">
                <span class="img back-bt">
                  <img src="../assets/arrow_left_b.png" alt="">
                </span>
              </span>
                    <div class="inner">
                        试题详情
                    </div>
                </div>
                <div class="main">
                    <div class="list">
                        <div class="inner" v-if="(data.qtp_code)" >
                            <div class="test_test">
                                <div class="title">
                                    <!-- <span class="sort">1.</span> -->
                                    <div v-html='data.context'></div>
                                </div>
                                <ul class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '单选题'">
                                    <li v-for="(item2,index2) in data.option" :class="{active:index2 == data.right_answer}">
                                        <span class="sort">{{$local.ABC_Zh(index2)}}.</span>
                                        <span class="option" v-html="item2"></span>
                                    </li>
                                </ul>
                                <ul class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '多选题'">
                                    <li v-for="(item2,index2) in data.option"
                                        :class="{active:data.right_answer[index2] == 1}">
                                        <span>{{$local.ABC_Zh(index2)}}.</span>
                                        <span>{{item2}}</span>
                                    </li>
                                </ul>
                                <ul class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '判断题'">
                                    <li v-for="(item2,index2) in option_" :class="{active:index2 == data.right_answer-1}">
                                        <span>{{item2}}</span>
                                    </li>
                                </ul>
                                <div class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '填空题'">
                                    <div class="aswer_label">答案：</div>
                                    <div class="aswer_content" v-for="(item2,index2) in data.right_answer">
                                        <span>{{item2}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="analysisbox" v-if="$local.getQ_Zh(data.qtp_code) == '简答题'">
                                <div class="aswer_label">
                                    【答案】
                                </div>
                                <div class="aswer_content">
                                    <span v-html='data.right_answer'></span>
                                </div>
                            </div>
                            <div class="analysisbox">
                                <div class="aswer_label">
                                    【解析】
                                </div>
                                <div class="inner"  v-show="data.detailed_answer" v-html="data.detailed_answer">
                                </div>
                            </div>
                            <div class="btnbox">
                                <span class="nextBtn">上一题</span>
                                <span class="nextBtn">下一题</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>

 


export default {
  name: 'itemDtail',
  props:{
     data: {
       type:Object,
       default: {}
    }
  },    
  data() {
    return {
       user:this.$local.fetch("user"), 
       option_:["错","对"],
       visble:false,
       readys:false
    }
  },
  created(){
     // console.log(this.$local.fetch("user"));
  },
  computed: {
    
  },  
  methods:{
     back(){
         this.visble = false;
       setTimeout( ()=> {
           this.readys = false;
       },400)
     }, 
     show(){
       this.visble = true;
     },
     ready(){
       this.readys = true;
       this.visble = true;
     },
     buy(){
       this.$router.push("/buy")
     }
  },
  components:{
      
   
  }
}

</script>

<style scoped lang="less">

  .detailPage {
      height: 100%;
      width: 100%;
      position: fixed;
      left: 0;
      right: 0;
      top:0;
      z-index:999;
      padding-top: 52px;
  }

  .wrap {
      background: #fff;
      height: 100%;
      width: 100%;
      overflow-y: auto;
  }
  .mHeight{
      height: 50px;
  }
  .main {

     .list{
       overflow-y: auto;
     }
     padding-bottom: 0;
  }

 
  .sumbitBt {
     height: 50px;
     background: #37aafd;
     color:#fff;
     text-align: center;
     position: absolute;
     bottom: 0;
     left:0;
     right: 0;
     width: 100%;;
     line-height: 50px;
     font-size: 18px;
     letter-spacing: 2px;
  }


  .control {
       position: fixed;
       bottom:0px;
       left:0;
       right: 0;
       height: 51px;
       z-index: 80;
       background: #37aafd;
       .item {
          float: left;
          width: 50%;
          text-align: center;
          line-height:50px;
          color: #fff;
          position: relative;
       }
       .disabled {
         color:#73c4fe;
       }
     }  

  



   .border-right{
      display: block;
      width: 1px;
      height: 20px;
      background: #e2e2e2;
      position: absolute;
      top: 14px;
      right:0; 
   }






 .test_title {
    font-size: 16px;
    color:#919191;
    height: 22.5px;
    padding: 16px;
 }
  

 .test_test {
    padding: 16px;
    margin-top: 0px;
    background-color: #fff;
    .title {
       margin-bottom: 20px;
    }
     .sort{
           position: absolute;
           left:18px;
         }
         .question {
           padding-left: 20px;
           display: block;
           font-size: 16px;
           color:#000000;
      }
    .aswerbox {
         padding-left: 0;
         .aswer_label {
            display: inline;
          }
        .aswer_content{
           display: inline-block;
        }
         padding-left:12px;
         .sort{
           position: absolute;
           left:16px;
         }
         .option {
           padding-left: 20px;
           display: block;
         }
         li {
           // background-color: #a3d3f6;
           padding: 12px 9px 12px 24px;
           border-radius: 5px;
           position: relative;
           background: #f6f6f6;
           margin-bottom: 8px;
           &.active {
             background: #b9eb79;

           }
         }
         margin-bottom: 30px;
       }


   }


 .btnbox {
     display: flex;
     justify-content: center;
     align-items: center;
     margin-bottom: 28px;
     span {
         display: block;
         background: #37aafd;
         padding: 8px 22px;
         margin: 0 20px;
         border-radius:5px;
         color:#fff;
     }
 }


  .analysisbox {
      padding: 0 16px;
      margin-bottom: 20px;
      .aswer_label {
          margin-bottom: 10px;
      }
      .inner{
          padding: 15px;
          background: #f6f6f6;
          border-radius: 4px;
          p {
              line-height: 1.6
          }
      }
  }


   .analysis {
      padding: 0 16px;
      margin-top: -30px;

     .govip{
        background: #e2b77c;
        height: 100%;
        width: 100%;
        height: 49px;
        line-height: 49px;
        padding-left:10px;
        color:#7f5010;
       
     }
   }
  

  
 
</style>
