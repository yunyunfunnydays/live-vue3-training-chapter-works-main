import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delProductModal = null;

const app = createApp({
	data() {
		return {
			test: 'test',
			apiUrl: 'https://vue3-course-api.hexschool.io',
			apiPath: 'colorfool',
			page: '1',
			products: [],
			pagination: {},
			tempProduct: {},
			isNew: false,
		}
	},

	methods: {
		checkAdmin() {
			const api = `${this.apiUrl}/v2/api/user/check`;
			axios.post(api)
				.then(() => {
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
					window.location = 'login.html';
				})
		},
		getData() {
			const api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/products?page=${this.page}`;
			axios.get(api)
				.then((res) => {
					const { products, pagination } = res.data;
					this.test = pagination;
					this.products = products;
					this.pagination = pagination;
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		openModal(state, item) {
			this.test = state;
			if ('addNew' === state) {
				this.tempProduct = {};
				this.isNew = true;
				productModal.show()
			} else if ('edit' === state) {
				this.tempProduct = { ...item };
				this.isNew = false;
				productModal.show();
			} else if ('delete' === state) {
				this.tempProduct = { ...item };
				delProductModal.show();
			}
		},
		addTempImageUrl() {
			if (!this.tempProduct.imagesUrl) {
				this.tempProduct.imagesUrl = [];
			}
			this.tempProduct.imagesUrl.push('');
		},
		updateProduct() {
			let api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product`;
			let httpMethod = 'post';
			if (!this.isNew) {
				api = `${api}/${this.tempProduct.id}`;
				httpMethod = 'put';
			}
			this.test = api;
			axios[httpMethod](api, { data: this.tempProduct })
				.then((res) => {
					alert(res.data.message);
					productModal.hide();
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				})
		},
		delProduct() {
			const api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
			axios.delete(api)
				.then((res) => {
					alert(res.data.message);
					delProductModal.hide();
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				})
		},
		changePage(num) {
			this.page = num;
			this.getData();
		}
	},
	mounted() {
		productModal = new bootstrap.Modal(document.getElementById('productModal'));
		delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));

		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		axios.defaults.headers.common.Authorization = token;
		this.checkAdmin();
	},

});

app.mount('#app');