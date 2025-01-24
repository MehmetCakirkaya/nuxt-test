<template>
  <div
    @click="selectProduct(product)"
    class="mb-1 col-6 col-sm-6 col-md-3 col-lg-2 p-2 position-relative"
  >
    <nuxt-link :to="`/product/${product.slug}`">
      <div style="color: #ffffff" class="h-100 p-card">
        <img v-if="product.price >= 401" src="https://i.gifer.com/b6u.gif" alt="Ürün resmi" top />
        <img v-if="product.price < 400" src="https://i.gifer.com/SsrL.gif" alt="Ürün resmi" top />
        <div class="text-white p-card-body">
          <div class="fire-animation">
            <img  v-if="product.price < 400" src="https://i.gifer.com/5Mz4.gif" alt="" />
          </div>
          <div class="star-animation">
            <img  v-if="product.price >= 401" src="https://i.gifer.com/2iiB.gif" alt="" />
          </div>
          <div class="card-title text-truncate-2">
            {{ product.name }}
          </div>

          <p class="card-text text-truncate-2">
            {{ product.description }}
          </p>
        </div>
        <div class="d-flex justify-content-between p-card-footer">
          <span>{{ product.price }}</span>
          <span> {{ product.review_count }}</span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/products";

const productStore = useProductStore();

const selectProduct = (product) => {
  // Seçilen ürünü store'a kaydet
  productStore.setCurrentProduct(product);
};

import { defineProps } from "vue";

// Product propunu tanımlayın
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style>
.p-card {
  background-color: #3a3c47;
  padding: 10px;
  border-radius: 14px;
}

.p-card img {
  border-radius: 10px;
}

.p-card-body {
  padding: 10px 6px;
}

.card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  max-height: 2.4em;
  height: 40px;
}

.card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  max-height: 2.4em;
  height: 40px;
}

.text-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.p-card-footer {
  background-color: transparent;
  border: 0;
}
</style>
