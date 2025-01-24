<template>
  <!-- <div>
    <h2>Kategoriler</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
  </div> -->
  <div class="slider-container category-slider" style="overflow: hidden">
    <ClientOnly>
      <swiper-container
        ref="containerRef"
        :slides-per-view="6"
        :space-between="15"
        :loop="true"
        :autoplay="true"
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 6 },
        }"
      >
        <swiper-slide
          style="max-width: 200px"
          v-for="category in categories"
          :key="category.id"
        >
          <nuxt-link to="/home">
            <div style="color: #ffffff" class="p-card">
              <img src="https://placehold.co/300x300" alt="Kategori resmi" />
              <div class="text-white category-text">
                <span>{{ category.name }}</span>
              </div>
            </div>
          </nuxt-link>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  categories: Array,
});

// document.addEventListener("DOMContentLoaded", () => {
//   const swiperEl = document.querySelector(".category-slider");

//   if (swiperEl) {
//     const swiperParams = {
//       slidesPerView: 6,
//       breakpoints: {
//         640: {
//           slidesPerView: 2,
//         },
//         1024: {
//           slidesPerView: 3,
//         },
//       },
//     };

//     Object.assign(swiperEl, swiperParams);
//     if (typeof swiperEl.initialize === "function") {
//       swiperEl.initialize();
//     } else {
//       console.error("Swiper initialize function not found!");
//     }
//   } else {
//     console.error("Swiper element not found!");
//   }
// });
</script>
