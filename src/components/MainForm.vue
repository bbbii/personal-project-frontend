<template>
  <div class="swiper-container">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="'Image ' + (index + 1)" class="image" style="object-fit: contain" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import image1 from "@/assets/mainimage1.jpg";
import image2 from "@/assets/mainimage2.jpg";
import image3 from "@/assets/mainimage3.jpg";
import image4 from "@/assets/mainimage4.jpg";
import image5 from "@/assets/mainimage5.jpg";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      images: [image1, image2, image3, image4, image5],
      swiperOptions: {
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        grabCursor: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
    };
  },
};
</script>

<style scoped>
.image {
  max-width: 100%;
  height: 100%;
}
</style>
