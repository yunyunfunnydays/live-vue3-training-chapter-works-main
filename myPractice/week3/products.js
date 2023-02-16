import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delProductModal = null;

const app = createApp({
	data() {
		return {
			apiUrl: 'https://vue3-course-api.hexschool.io',
			apiPath: 'colorfool',
			products: [
			],
			tempProduct: {
				imagesUrl: [],
			},
			isNew: '',
		}
	},
	methods: {
		checkAdmin() {
			const url = `${this.apiUrl}/v2/api/user/check`;
			axios.post(url)
				.then(() => {
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
					// window.location = 'login.html';
				});
		},
		getData() {
			const url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/products`;
			axios.get(url)
				.then((res) => {
					this.products = res.data.products;
				})
				.catch((err) => {
					alert(err.response.data.message);
				})
		},
		openModal(state, product) {
			if ('isNew' === state) {
				this.tempProduct = {
					imagesUrl: [],
				};
				this.isNew = true;
				productModal.show();
			} else if ('edit' === state) {
				// 若不用展開則為傳參，直接改會同步改到原本的data
				this.tempProduct = { ...product };
				this.isNew = false;
				productModal.show();
			} else if ('delete' === state) {
				this.tempProduct = { ...product };
				delProductModal.show();
			}
		},
		updateProduct() {
			let url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product`;
			let apiMethod = '';
			if (!this.isNew) {
				apiMethod = 'put';
				url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
			} else {
				apiMethod = 'post';
			}
			axios[apiMethod](url, { data: this.tempProduct })
				.then((res) => {
					alert(res.data.message);
					productModal.hide();
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		delProduct() {
			const url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
			axios.delete(url)
				.then((res) => {
					alert(res.data.message);
					delProductModal.hide();
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		addTempImageUrl() {
			if (!this.tempProduct.imagesUrl) {
				this.tempProduct.imagesUrl = [];
			}
			this.tempProduct.imagesUrl.push('');
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