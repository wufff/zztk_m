<template>
    <div class="page">
        <div class="head">
        <span class="back" @click.stop="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
            <div class="inner">
                {{paperTitle.paper_title}}
            </div>
        </div>
        <div class="main">
            <div class="list">
                <cube-scroll
                        ref="scroll"
                        :options="options">
                    <div class="wrapscroll">
                        <div class="head-title">
                            <h5>{{paperTitle.paper_title}}</h5>
                            <span> 共{{paperTitle.paper_q_count}}题</span>
                            <span class="goTest" @click="goTest(paperTitle.paper_code_crc32,paperTitle.paper_title)">
                                开始练习
                            </span>
                        </div>
                        <div class="itemClassfiy" v-for="(val,key,index) in datalist" :class="{padding:open[index]}">
                            <div class="title">{{$local.getQ_Nu(index)}}、{{$local.getQ_Zh(key)}}</div>
                            <div class="closeBtndiv"  @click="up_down(index)">
                                <span class="img closeBtn">
                                    <img src="../assets/arrow_up.png" alt="" v-show="open[index]">
                                    <img src="../assets/arrow_down.png" alt="" v-show="!open[index]">
                                </span>
                            </div>
                            <div class="items" v-show="open[index]">
                                <div class="test" v-for="(item,index) in val" @click="showDtail(item.master_code_crc32)">
                                    <div class="test_title">
                                        <span>{{index+1}} .</span>
                                        <div v-html="item.context"></div>
                                    </div>
                                    <ul class="aswerbox" v-if="$local.getQ_Zh(key) == '单选题' || $local.getQ_Zh(key) == '多选题'">
                                        <li v-for="(item2,index2) in item.option">
                                            <span class="sort">{{$local.ABC_Zh(index2)}}.</span>
                                            <div class="option" v-html="item2"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </cube-scroll>
            </div>
        </div>
        <itemDtail  ref="itemDtail" :data="itemOne"></itemDtail>
    </div>
</template>
<script>
    import itemDtail from '@/components/itemDtail.vue'
    import { ITEMDTAIL,paperDtail} from '@/api';
    export default {
        name: 'cart',
        data() {
            return {
                data:"",
                options:{
                    click:true,
                    bounce:false,
                },
                clearable:{
                    visible: true,
                    blurHidden: false
                },
                ready:false,
                datalist:{},
                itemOne:{},
                head_s:this.$local.fetch("head_s"),
                user:this.$local.fetch("user"),
                open:[true,true,true,true,true,true],
                paperTitle:"",
                value:"",
                dialog:false,
                url:"/myDown"
            }
        },
        created(){
            var id = this.$route.query.id;
            paperDtail(1,{paper_code_crc32:id}).then((data)=>{
                console.log(data);
                this.datalist = data.qtrunk_list;
                this.paperTitle=data.paper_info;
                this.ready = true;
            })
        },
        methods:{
            back(){
                window.history.go(-1);
            },
            up_down(index){
                var bl = !this.open[index];
                var _this = this;
                this.$set(_this.open,index,bl);
            },
            showDtail(id){
                this.$refs.itemDtail.show();
                ITEMDTAIL(1,{master_code_crc32:id}).then((data)=>{
                    this.itemOne = data[0];
                    this.$refs.itemDtail.ready();
                    console.log(this.itemOne);
                })
            },
            goTest(id,name){
                this.$router.push({path:"/myTest",query:{id:id,type:"real",name:name}})
            }
        },
        computed:{
            lengths(){
                var arr = Object.keys(this.datalist);
                return arr.length
            }
        },
        components:{
            itemDtail
        }
    }

</script>
<style scoped lang="less">
    .page{
        .main {
            padding-top: 49px;
            padding-bottom: 0;
        }
        .list {

        }
        .control {
            position: fixed;
            bottom:50px;
            left:0;
            right: 0;
            height: 51px;
            z-index: 80;
            background: #37aafd;
            .item {
                float: left;
                width: 33.333%;
                text-align: center;
                line-height:50px;
                color: #fff;
                position: relative;
            }
        }
    }

    .head-title {
        background: #fff;
        padding:10px 15px;
        font-size: 15px;
        position: relative;
        h5 {
            margin-bottom: 5px;
        }
        span {
            font-size: 14px;
            color:#919191;
        }
        .goTest {
            position: absolute;
            right: 15px;
            bottom:10px;
            font-size: 14px;
            color: #fff;
            background: #37aafd;
            padding: 6px 12px;
            border-radius: 3px;
        }
    }


    #del {
        position: absolute;
        bottom:0;
    }


    .itemClassfiy {
        background: #fff;
        padding: 0 15px 0px 15px;
        margin-top: 10px;
        position: relative;
        &.padding {
            padding:  0 15px 10px 15px;
        }
        .title {
            font-size: 18px;
            height: 57px;
            line-height: 57px;
            padding-left: 15px;
            background: #fff;
            position: relative;
        }
        .closeBtn {
            height: 8px;
            width: 15px;
            margin: 0 auto;
            display: block;
        }
        .closeBtndiv{
            position: absolute;
            right: 15px;
            top:10px;
            width: 40px;
            height: 40px;
            padding-top:8px;
        }
        .test {
            padding: 16px 16px 16px 16px;
            background: #f1f1f1;
            margin-bottom: 10px;
            margin-top: 0;
            position: relative;
            .dele_h {
                width: 18px;
                height: 19px;
                position: absolute;
                bottom:15px;
                right: 15px;
            }
            .test_title {
                font-size: 15px;
                margin-bottom: 8px;
                position: relative;
                > span {
                    position: absolute;
                    left:0;
                    top:2px;
                }
                > div {
                    padding-left: 20px;
                    padding-top:2px;
                }
            }
            .aswerbox {
                padding-left:12px;
                .sort{
                    position: absolute;
                    left:2px;
                }
                .option {
                    padding-left: 20px;
                    display: block;
                    font-size: 15px;
                }
                li {
                    border-radius: 2px;
                    // background-color: #a3d3f6;
                    padding: 6px;
                    position: relative;
                }
            }
        }
    }




    .buy-mark {
        height: 100%;
        width: 100%;
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        z-index:999;
        background: rgba(0,0,0,0.4);
        .buy-dialge {
            width: 280px;
            height: 144px;
            border-radius: 3px;
            background-color: #fff;
            position: absolute;
            margin-left: -140px;
            margin-top: -72px;

            left:50%;
            top: 50%;
            padding: 20px 15px 0 15px;
            .nitco {
                text-align: center;
                color:#7c5724;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .buyBt {
                width: 252px;
                color:#fff;
                background-color: #a05f38;
                text-align: center;
                height: 43px;
                line-height: 43px;
                border-radius: 5px;
                font-size: 16px;
                margin: 0 auto;
                letter-spacing: 2px;
            }
            h4 {
                text-align: center;
            }
            .bottomWrap {
                height: 50px;
                position: absolute;
                bottom: 0;
                left:0;
                right:0;
                > div{
                    height: 50px;
                    width: 50%;
                    float: left;
                    line-height: 50px;
                    text-align: center;
                    color:#999;
                }
                > div.subitbtn {
                    color:#37aafd;
                    font-size: 16px;
                }
            }
        }
    }




    .noneWarp {
        text-align: center;
        padding-top: 155px;
        .none_items {
            width: 108px;
            height: 85px;
            margin-bottom: 15px;
        }
        .title{
            margin-bottom: 15px;
        }
        .goItem {
            color:#37aafd;
            font-size: 17px;
        }
    }

    .dele_b{
        width: 17px;
        height: 19px;
        position: relative;
        top:2px;
        margin-right: 4px;
    }

    .downLoad_b {
        width: 17px;
        height: 17px;
        position: relative;
        top:2px;
        margin-right: 2px;
    }

    .save_b {
        width: 17px;
        height: 17px;
        position: relative;
        top:3px;
        margin-right: 2px;
    }


    .border-right{
        display: block;
        width: 1px;
        height: 20px;
        background: #fff;
        position: absolute;
        top: 14px;
        right:0;
    }





</style>
<!-- var _this = this;
       this.dialog = this.$createDialog({
        type: 'prompt',
        title: '请输入试卷标题',
        prompt: {
          value: this.mrTitle,
          placeholder: '输入试卷标题'
        },
        onConfirm: (e, promptValue) => {
          if(!promptValue){
             this.dialog.show();
             return false;
          }

           var obj = {
              paper_title:promptValue,
              ...this.head_s
           }
           savaCart(3,obj).then((data)=>{
                var id = data.paper_id;
                this.$router.push({path:"/myDown",query:{id:id}})
           })
        }
       }).show()

      setTimeout(()=>{
            document.querySelector('.cube-input-field').addEventListener(
            'blur',
            function(){
              window.scrollTo(0,0);
              this.$refs.scroll.scrollTo(0,0,0);
            },false)
      },10)
 -->