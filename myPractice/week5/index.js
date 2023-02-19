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
  validateOnInput: true,
});


const app = createApp({
  data() {
    return {
      test: '',
      apiUrl: 'https://vue3-course-api.hexschool.io',
      apiPath: 'colorfool',
      products: {},
      cart: '',
    }
  },
  components: {
    vForm: Form,
    vField: Field,
    vErrorMessage: ErrorMessage,
  },
  mounted() {
    const api = `${this.apiUrl}/v2/api/${this.apiPath}/products`;
    axios.get(api)
      .then((res) => {
        this.products = res.data.products;
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
  }
});

app.mount('#app');