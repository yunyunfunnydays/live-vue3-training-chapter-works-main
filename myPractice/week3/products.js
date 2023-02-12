import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delProductModal = null;

const app = createApp({
	data() {
		return {
			apiUrl: 'https://vue3-course-api.hexschool.io/',
			api: 'colorfool',
			products: [],
			tempProduct: {},
		}
	},
	methods: {
		getData() {
			const url = `${this.apiUrl}v2/api/${this.api}/admin/products`;
			axios.get(url)
				.then((res) => {
					this.products = res.data.products;
				})
				.catch((err) => {
					alert(err.response.data.message);
				})
		},
		checkAdmin() {
			const url = `${this.apiUrl}v2/api/user/check`;
			axios.post(url)
				.then(() => {
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
					window.location = 'login.html';
				});
		},
		openModal(state, item) {
			if ('isNew' === state) {
				this.tempProduct = {};
				productModal.show();
			} else if ('edit' === state) {
				this.tempProduct = { ...item };
				productModal.show();
			} else if ('delete' === state) {
				this.tempProduct = { ...item };
				delProductModal.show();
			}
		},
		updateProduct() {
			const url = '';
		},
		delProduct() {
			const url = `${this.apiUrl}v2/api/${this.api}/admin/product/${this.tempProduct.id}1`;
			axios.delete(url)
				.then((res) => {
					alert(res.data.message);
					delProductModal.hide();
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		}
	},
	mounted() {
		productModal = new bootstrap.Modal(document.getElementById('productModal'));
		delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));

		const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
		axios.defaults.headers.common.Authorization = myCookie;
		this.checkAdmin();
	}
})
app.mount('#app');