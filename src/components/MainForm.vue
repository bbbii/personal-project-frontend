<template>
  <v-row>
    <v-col cols="12">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide><img class="image" src="@/assets/apple.png" /></swiper-slide>
        <swiper-slide><img class="image" src="@/assets/grape.png" /></swiper-slide>
        <swiper-slide><img class="image" src="@/assets/gyul.png" /></swiper-slide>
        <swiper-slide><img class="image" src="@/assets/watermelon.png" /></swiper-slide>
        <swiper-slide><img class="image" src="@/assets/mango.png" /></swiper-slide>
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
  name: "MainForm",
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
.image {
  max-width: 100%;
  height: auto;
}
</style>
