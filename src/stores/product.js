import axios from 'axios';
import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state() {
    return {
      productItems: [],
    };
  },

  actions: {
    async getProductItems() {
      const response = await axios.get('/api/products'); // via proxy -> http://localhost:3000/products
      this.productItems = response.data;
    },
  },
});
