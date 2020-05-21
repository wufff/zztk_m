<template>
     <div>
         目录
     </div>
</template>

<script>
    export default {
        name: "special"
    }
</script>

<style scoped lang="less">
    .swiper-container {
        width: 100%;
        height: 100%;
    }
    .recommend {
        background-color: #fff;
        padding: 6px 15px;
        margin-top: 10px;
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
</style>