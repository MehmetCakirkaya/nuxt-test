<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useProductStore } from "@/stores/products";
import ProductCard from "~/components/ProductCard.vue";
import CategoryCard from "@/components/CategoryCard.vue";

const containerRef = ref(null);

const swiper = useSwiper(containerRef, {
  effect: "creative",
  loop: true,
  autoplay: {
    delay: 2000,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
});

const productStore = useProductStore();
const products = ref([]);
const categories = ref([]);
const sliders = ref([]);

const fetchData = async () => {
  await productStore.fetchProducts();
  await productStore.fetchCategories();
  await productStore.fetchSliders();
  products.value = productStore.products;
  categories.value = productStore.categories;
  sliders.value = productStore.sliders;
};

onBeforeMount(async () => {
  await fetchData();
});
</script>

<template>
  <!-- Navbar Başlangıcı -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark1">
    <div class="container">
      <!-- Sol Menüler -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">Products</a>
          </li>
        </ul>
      </div>

      <!-- Sağ Buton -->
      <div>
        <a href="#" class="btn btn-primary">Contact</a>
      </div>
    </div>
  </nav>
  <!-- Navbar Sonu -->

  <!-- İçerik Alanı Başlangıcı -->
  <div class="container mt-4">
    <div class="row">
      <!-- Sol Taraf -->
      <div class="col-md-8 mb-3 banner-slider">
        <div class="p-3 bg-dark1 rounded">
          <div class="slider-container">
            <ClientOnly>
              <swiper-container ref="containerRef">
                <swiper-slide v-for="slide in sliders" :key="slide.id">
                  <img src="https://placehold.co/800x400" alt="" />
                  <span class="slider-title">{{ slide.title }}</span>
                </swiper-slide>
                <!-- <swiper-slide>
                  <img src="https://placehold.co/800x400" alt="" />
                </swiper-slide> -->
              </swiper-container>
            </ClientOnly>

            <!-- Go back one slide -->
            <button class="left-btn" @click="swiper.prev()"></button>
            <!-- Go forward one slide -->
            <button class="right-btn" @click="swiper.next()"></button>
          </div>
        </div>
      </div>

      <!-- Sağ Taraf -->
      <div class="col-md-4 small-banners">
        <div class="p-3 mb-3 bg-dark1 rounded">
          <img class="mb-4" src="https://placehold.co/400x200" alt="" />
          <img src="https://placehold.co/400x200" alt="" />
        </div>
      </div>
    </div>

    <div>
      <div class="container mt-5">
        <div class="cards-container">
          <CategoryCard :categories="categories" />
        </div>
      </div>
    </div>

    <div>
      <div class="container mt-5">
        <div class="cards-container">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- İçerik Alanı Sonu -->
</template>
