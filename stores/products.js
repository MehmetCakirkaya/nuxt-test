import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    currentProduct: null,
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch(
          "https://demoapi.kodlademo.com/?endpoint=products_1"
        );
        const data = await response.json();
        console.log(data)
        console.log("yüklendi")
        this.products = data.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          review_count: product.review_count,
          sku: product.sku,
        }));
      } catch (error) {
        console.error("Veriler çekilirken bir hata oluştu:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await fetch(
          "https://demoapi.kodlademo.com/?endpoint=category"
        );
        const data = await response.json();
        this.categories = data; 
      } catch (error) {
        console.error("Kategoriler çekilirken bir hata oluştu:", error);
      }
    },
    async fetchSliders() {
      try {
        const response = await fetch(
          "https://demoapi.kodlademo.com/?endpoint=sliders"
        );
        const data = await response.json();
        this.sliders = data; 
      } catch (error) {
        console.error("Slider lar çekilirken bir hata oluştu:", error);
      }
    },
    async fetchSecondProductList() {
      try {
        const response = await fetch(
          "https://demoapi.kodlademo.com/?endpoint=products_2"
        );
        const data = await response.json();
        this.secondlist = data; 
      } catch (error) {
        console.error("Slider lar çekilirken bir hata oluştu:", error);
      }
    },
    addProduct(product) {
      this.products.push(product);
    },
    removeProduct(productId) {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
    },
    setProducts(products) {
      this.products = products;
    },
    setCurrentProduct(product) {
      this.currentProduct = product;
    }
  },
  getters: {
    productCount(state) {
      return state.products.length;
    }
  }
});