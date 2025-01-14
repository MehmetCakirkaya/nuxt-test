<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '~/components/ProductCard.vue'


const products = ref([])
const containerRef = ref(null)

const swiper = useSwiper(containerRef, {
  effect: 'creative',
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
})

onMounted(async () => {
  try {
    const response = await fetch('https://demoapi.kodlademo.com/?endpoint=products_1')
    const data = await response.json()
    console.log(data)
    products.value = data.map((product: { id: any; name: any; description: any; price: any; review_count: any }) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        // image: `https://demoapi.kodlademo.com/${product.img_url}`, // Tam URL'yi sağladığınızdan emin olun
        review_count: product.review_count
      }
    })
  } catch (error) {
    console.error('Veriler çekilirken bir hata oluştu:', error)
  }
})

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
        <div class="col-md-8 mb-3">
          <div class="p-3 bg-dark1 rounded">
            <div class="slider-container">
              <ClientOnly>
                <swiper-container ref="containerRef">
                  <swiper-slide>
                    <img src="https://placehold.co/800x400" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="https://placehold.co/800x400" alt="">
                  </swiper-slide>
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
            <img class="mb-4" src="https://placehold.co/400x200" alt="">
            <img src="https://placehold.co/400x200" alt="">
          </div>
        </div>
      </div>
  
      <div>
        <div class="container mt-5">
          <div class="cards-container">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
  
    </div>
    <!-- İçerik Alanı Sonu -->
  </template>

<style lang="css">
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  /* height: 369px; */
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
}

.small-banners img {
  border-radius: 10px;
}
</style>