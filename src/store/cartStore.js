import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/store/statusStore';

const status = statusStore();
export default defineStore('cartStore', {
  state: () => ({
    cart: {},
  }),
  getters: {

  },
  actions: {
    addToCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;

      status.cartLoading = id;
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: cart }).then((response) => {
        status.pushMessage({ title: '加入購物車' });
        console.log(response);
        status.cartLoading = '';
        this.getCart();
      });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      status.isLoading = true;
      axios.get(url).then((response) => {
        this.cart = response.data.data;
        console.log(response);
        status.isLoading = false;
      });
    },
    updateCart(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      status.isLoading = true;
      status.cartLoading = item.id;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios.put(url, { data: cart }).then((response) => {
        console.log(response);
        this.getCart();
        status.cartLoading = '';
        status.isLoading = false;
      });
    },
    removeCartItem(id) {
      status.cartLoading = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      status.isLoading = true;
      axios.delete(url).then((response) => {
        console.log(response);
        // axiosMessageState(response, '移除購物車品項');
        status.cartLoading = '';
        this.getCart();
        status.isLoading = false;
      });
    },
  },
});
