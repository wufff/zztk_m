let local = {
   save (key,value){
      let str = JSON.stringify(value);
   	  localStorage.setItem(key,str);
   },
   fetch(key){
      let str = localStorage.getItem(key);
    	return JSON.parse(str) || undefined;
   },
   stage_zh(str){
   	 if(str === 1){
   	 	 return "小学"
   	 } else if (str === 2){
         return "初中"
   	 } else if (str === 3){
        return "高中"
   	 }else {
       return ""
     }
   },
   getQ_Zh(str){
      if(str === "QTP_OBJ_003") {return "单选题"}
      if(str === "QTP_OBJ_004") {return "多选题"}
      if(str === "QTP_OBJ_006") {return "判断题"}
      if(str === "QTP_OBJ_007") {return "填空题"}
      if(str === "QTP_SUB_006") {return "分析题"}
  },


  getQ_Nu(num){
      if(num === 0) {return "一"}
      if(num === 1) {return "二"}
      if(num === 2) {return "三"}
      if(num === 3) {return "四"}
  },

    /**
     * @return {string}
     */
    ABC_Zh(num){
        if(num === 0) {return "A"}
        if(num === 1) {return "B"}
        if(num === 2) {return "C"}
        if(num === 3) {return "D"}
    },


    fomartAnswer(type,as){
    if(type === "QTP_OBJ_003" ||  type === "QTP_OBJ_006"){
        return fomartOPontion(as);
    }
     
    if(type === "QTP_OBJ_004"){
        if(as.length === 0){
            return 0;
        }else{
          let  num = 0;
          for(let i = 0;i<as.length; i++){
              if(as[i] === 1) {
                  num += fomartOPontion(i);
              }
          }
          return num;
        } 
   }
 }
};



 function fomartOPontion(as){
      if(as == 0){
         return 1
       }
      if(as == 1){
          return 2
       } 
      if(as == 2){
          return 4
       }
      if(as == 3){
          return 8
       }
      if(as == 4){
           return 16
       }
       if(as == 5){
           return 32
        } 
        if(as == 6){
           return 64
         }
        if(as == 7){
            return 128
        }       
        if(as == ""){
            return 0
        }           
  }

export default {
	install:function(vm){
		 vm.prototype.$local = local;
	}
}