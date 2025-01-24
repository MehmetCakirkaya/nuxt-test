<template>
  <div class="container mt-5">
    <h2>All Products</h2>
    <div class="cards-container">
      <ProductCard
        v-for="product in allList"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "~/components/ProductCard.vue";
import { ref, onBeforeMount } from "vue";
import { useProductStore } from "@/stores/products";

const productStore = useProductStore();
const allList = ref([]);


const fetchData = async () => {
  await productStore.fetchProducts();
  await productStore.fetchSecondProductList();
  
  allList.value = [
    ...productStore.products,
    ...productStore.secondlist
  ];
};

onBeforeMount(async () => {
  await fetchData();
});
</script>
