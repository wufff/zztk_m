<template>
  <div class="page">
    <div class="head">
        <span class="back" @click="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
          <div class="inner">
            设置密码
      </div>
     </div>      
     <div class="main">
              <div class="list">
             <div class="content">
              <ul>
                <li class="item">
                     <cube-input 
                    v-model="passwrod" 
                    :placeholder="placeholder2" 
                    :type="type2"
                     @blur.native.capture="handleBug">
                     </cube-input>                       
                </li>
              </ul>
                <!-- <input type="password" v-model="passwrod" class="usename" placeholder="请设置密码">  -->         
             </div>
             <div class="btn_subimt" @click="submit">
                 确定
             </div>
         </div>         
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { SETPWD } from '@/api'

export default {
  name: 'items',
  data(){
     return {
       passwrod:"",
       placeholder2:"请设置密码",
       type2:"password"
     }
  },

  created(){
     
  },
  mounted(){
  
  },

  methods:{
     back(){
       window.history.go(-1);
     },
     submit(){
        if(this.passwrod != "" && this.passwrod.length > 5){
            var obj = {
               user_pwd:this.passwrod
            }
           SETPWD(3,obj).then((data)=>{
              if(data.type == "error"){
                    this.$createToast({
                     type: 'none',
                     time: 800,
                     txt: data.message
                  }).show();                    
              }else{
                  var token = data.sid;
                  this.$local.save("token",token);
                  this.goback()
              }
           })  
        }else if( this.passwrod.length < 6){
             this.$createToast({
                     type: 'none',
                     time: 800,
                     txt: "至少设置6位密码"
              }).show();                            
        }
     },
    handleBug() {
        console.log("handleBug")
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
    },
      goback(){
          let url = window.location.href;
          let mainUrl = url.split("#")[0];
          var hash =  window.sessionStorage.getItem("backUrl");
          window.sessionStorage.setItem("backUrl","");
          if(!hash){
              window.location.href = mainUrl;
          }else{
              window.location.href = mainUrl + "#" + hash;
          }
          loading.style.display = "none";
      }
  },
  components: {
     
  }
}
</script>
<style scoped lang="less">
    .main {
       padding-top: 52px;
       background-color: #fff;
    }
  

   .pionter {
       padding-left: 15px;
       color: #919191;
       padding-top: 5px;
       display: block;
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


   .content {
     padding-top: 85px;
     margin-bottom: 150px;
     input {
          background-color: #f6f6f6;
          height: 50px;
          line-height: 50px;
          border-radius: 5px;
          display: block;
          padding-left: 25px;
       }
       input.usename {
          width: 260px;
          margin: 0 auto;
          display: block;
          padding:0 25px;
          font-size: 15px;
          margin-bottom: 20px;
       }     
     input.code {
        width: 150px;
        float: left;
     }
     .item {
       margin-bottom: 17px;
       padding:0 35px;
     }
     .codeBtn {
        float:right;
        height: 50px;
        line-height: 52px;
        text-align: center;
        width: 110px;
        background: #37aafd;
        color:#fff;
        border-radius: 5px;
     }
     .notice{
        padding-left: 32px;
        color:#777777;
        margin-bottom: 81px;
     }
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
         width: 33.333%;
         text-align: center;
         font-size: 15px;
         color:#000000;
         position: relative;
      }
   }

   .main {
        padding-top: 52px;
        padding-bottom: 0px;
   }

   .btn_subimt {
      height: 50px;
      width: 310px;
      margin: 0 auto;
      text-align: center;
      line-height: 50px;
      color:#fff;
      background-color: #37aafd;
      font-size: 17px;
      letter-spacing: 4px;
      border-radius: 5px;
      margin-bottom: 35px;
   }

     .selectBox {
        width: 100%;
        height: 100%;
     }

   .type{
     text-align: center;
     color:#777777;
   }
</style>
