<template>
  <div v-if="product" class="product-page container mt-5">
    <div class="row">
      <!-- Sol Taraf: Büyük Fotoğraf ve Slider -->
      <div
        style="display: flex; align-items: center; justify-content: center"
        class="col-md-6"
      >
        <swiper
          :slidesPerView="4"
          spaceBetween="10"
          class="mySwiper m-0"
          style="
            display: flex;
            flex-wrap: wrap;
            width: 100px;
            margin-right: 10px;
          "
        >
          <swiper-slide
            v-for="(url, index) in product.gallery"
            :key="index"
            @click="updateMainImage(url)"
          >
            <img :src="url" alt="Ürün Fotoğrafı" class="img-thumbnail" />
          </swiper-slide>
        </swiper>
        <img
          :src="mainImage"
          alt="Büyük Ürün Resmi"
          class="img-fluid main-image"
          style="max-height: 400px; width: 100%"
        />
      </div>

      <!-- Sağ Taraf: Ürün Bilgileri -->
      <div class="col-md-6 w-full d-flex align-items-center">
        <div class="product-info bg-dark1" style="width: 100%">
          <h3>{{ product.name }}</h3>
          <p><strong>SKU:</strong> {{ product.sku }}</p>
          <p>{{ product.description }}</p>
          <h4>{{ product.price }}</h4>

          <!-- Ürün Miktarı ve Sepete Ekle Butonu -->
          <div class="quantity-container mb-3">
            <button @click="decreaseQuantity">-</button>
            <input type="number" v-model="quantity" min="1" />
            <button @click="increaseQuantity">+</button>
          </div>
          <button class="btn btn-primary" @click="addToCart">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Ürün bilgisi bulunamadı.</p>
  </div>
</template>

<script setup>

import { useProductStore } from '@/stores/products';
import { onMounted } from 'vue';

const productStore = useProductStore();

onMounted(() => {
  // Burada istersen API çağrısı ile ürün detayını alabilirsin
  // productStore.setCurrentProduct(fetchedProduct);
});

const product = productStore.currentProduct;



import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

// Örnek ürün verisi
const exproduct = ref({
  name: "Örnek Ürün",
  sku: "SKU12345",
  description: "Bu, ürün açıklamasıdır.",
  price: 999.99,
  gallery: [
    "https://placehold.co/400x300",
    "https://placehold.co/300x400",
    "https://placehold.co/300",
    "https://placehold.co/400",
  ],
});

const mainImage = ref(exproduct.value.gallery[0]);
const quantity = ref(1);

const formattedPrice = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.value.price);
});

function updateMainImage(url) {
  mainImage.value = url;
}

function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  if (quantity.value > 1) quantity.value--;
}

function addToCart() {
  alert(`Sepete eklendi: ${quantity.value} adet`);
}
</script>

<style>
.product-page {
  font-family: "Roboto", sans-serif;
}

.product-page .mySwiper img {
  width: auto !important;
}

.product-info {
  padding: 20px 20px;
  color: white;
}

.main-image {
  border-radius: 8px;
}

.mySwiper .swiper-slide {
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.quantity-container {
  display: flex;
  align-items: center;
}

.quantity-container button {
  padding: 0.5rem;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.quantity-container input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}
</style>
