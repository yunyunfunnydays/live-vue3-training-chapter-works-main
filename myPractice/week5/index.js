import { productDetailModal } from "./productDetailModal.js";


const { createApp } = Vue;
const { Form, Field, ErrorMessage, defineRule, configure } = VeeValidate;
const { email, required, min, max } = VeeValidateRules;
const { loadLocaleFromURL, localize } = VeeValidateI18n;


defineRule('email', email);
defineRule('required', required);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: false,
});


const app = createApp({
  data() {
    return {
      test: '',
      apiUrl: 'https://vue3-course-api.hexschool.io',
      apiPath: 'colorfool',
      products: [],
      productDetail: {},
      cart: {
        carts: '',
        total: '',
        final_total: ''
      },
      userForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      loadingItem: '',
    }
  },
  components: {
    vForm: Form,
    vField: Field,
    vErrorMessage: ErrorMessage,
    productDetailModal,
  },
  methods: {
    getProduct() {
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/products`;
      axios.get(api)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    getDetail(product) {
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/product/${product.id}`;
      this.loadingItem = product.id;
      axios.get(api)
        .then((res) => {
          this.productDetail = res.data.product;
          this.$refs.productDetailModal.showModal();
          this.loadingItem = '';
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    getCart() {
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/cart`;
      axios.get(api)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(product, qty = 1) {
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/cart`;
      const data = {
        product_id: product.id,
        qty,
      }
      this.loadingItem = product.id;
      axios.post(api, { data })
        .then((res) => {
          alert(res.data.message);
          this.loadingItem = '';
          this.getCart();
        })
        .catch((err) => {
          this.test = err;
          alert(err.response.data.message);
        })
        ;
    },
    updateCart(item) {
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/cart/${item.id}`;
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      }
      axios.put(api, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    delCartItem(item) {
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/cart/${item.id}`
      this.loadingItem = item.id;
      axios.delete(api)
        .then((res) => {
          alert(`${res.data.message}商品 ${item.product.title}`);
          this.loadingItem = '';
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message)
        })

    },
    delCartAll() {
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/carts`;
      const loader = this.$loading.show();
      axios.delete(api)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          loader.hide();
        })
        .catch((err) => {
          this.test = err;
          alert(err.response.data.message);
        })
    },
    checkOut() {
      const api = `${this.apiUrl}/v2/api/${this.apiPath}/order`;
      const data = this.userForm;
      const loader = this.$loading.show();
      axios.post(api, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          // !可 reset form
          this.$refs.form.resetForm();
          loader.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
  },
  mounted() {
    const loader = this.$loading.show();
    this.getProduct();
    this.getCart();
    loader.hide();

  }
});
app.use(VueLoading.LoadingPlugin);
app.mount('#app');