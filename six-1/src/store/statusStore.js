import { defineStore } from 'pinia';

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,
    cartLoading: '',
    messages: [],
  }),
  actions: {
    pushMessage(data) {
      const { title, content, style = 'success' } = data;
      this.messages.push({ style, title, content });
    },
  },
});
