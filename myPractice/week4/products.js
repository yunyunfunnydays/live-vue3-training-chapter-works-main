import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { pagination } from "./components/pagination.js";
import { delProductModal } from "./components/delProductModal.js";

let productModal = null;


const app = createApp({
	data() {
		return {
			test: 'test',
			apiUrl: 'https://vue3-course-api.hexschool.io',
			apiPath: 'colorfool',
			products: [],
			pagination: {},
			tempProduct: {},
			isNew: false,
		}
	},
	components: { pagination, delProductModal },
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
		getData(pageNum = 1) {
			const api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/products?page=${pageNum}`;
			axios.get(api)
				.then((res) => {
					const { products, pagination } = res.data;
					this.products = products;
					this.pagination = pagination;
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		openModal(state, product) {
			if ('addNew' === state) {
				this.tempProduct = {};
				this.isNew = true;
				productModal.show()
			} else if ('edit' === state) {
				this.tempProduct = { ...product };
				this.isNew = false;
				productModal.show();
			} else if ('delete' === state) {
				this.tempProduct = { ...product };
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
	},
	mounted() {
		productModal = new bootstrap.Modal(document.getElementById('productModal'));
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		axios.defaults.headers.common.Authorization = token;
		this.checkAdmin();
	},
});
app.mount('#app');