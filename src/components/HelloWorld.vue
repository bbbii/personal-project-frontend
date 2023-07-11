<template>
  <v-row>
    <v-col cols="12">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide>배너 1</swiper-slide>
        <swiper-slide>배너 2</swiper-slide>
        <swiper-slide>배너 3</swiper-slide>
        <swiper-slide>배너 4</swiper-slide>
        <swiper-slide>배너 5</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- pagination  -->

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <!-- navigation  -->
      </swiper>
    </v-col>
  </v-row>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "HelloWorld",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
      },
    };
  },
};
</script>

<style scoped>
.swiper {
  height: 300px;
  width: 100%;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}
</style>
