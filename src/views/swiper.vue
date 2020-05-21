<template>
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>I'm Slide 1</swiper-slide>
        <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
        <swiper-slide>I'm Slide 4</swiper-slide>
        <swiper-slide>I'm Slide 5</swiper-slide>
        <swiper-slide>I'm Slide 6</swiper-slide>
        <swiper-slide>I'm Slide 7</swiper-slide>
    </swiper>
</template>

<script>
    export default {
        name: 'carrousel',
        data() {
            var _this = this;
            return {
                currut:0,
                swiperOption: {
                    on:{
                        slideChange: function () {
                            _this.currut = this.activeIndex;
                        }
                    }
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            console.log('this is current swiper instance object', this.swiper)
            this.swiper.slideTo(3, 1000, false)
        }
    }
</script>
<style>


</style>