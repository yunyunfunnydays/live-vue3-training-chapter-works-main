import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { pagination } from "./components/pagination.js";
import { delProductModal } from "./components/delProductModal.js";
import { productModal } from "./components/productModal.js";

// let productModal = null;


const app = createApp({
	data() {
		return {
			apiUrl: 'https://vue3-course-api.hexschool.io',
			apiPath: 'colorfool',
			api: '',
			products: [],
			pagination: {},
			tempProduct: {},
			isNew: false,
		}
	},
	components: { pagination, delProductModal, productModal },
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
				this.api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product`;
				this.$refs.productModal.showModal()
			} else if ('edit' === state) {
				this.tempProduct = { ...product };
				this.isNew = false;
				this.api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
				this.$refs.productModal.showModal();
			} else if ('delete' === state) {
				this.tempProduct = { ...product };
				this.api = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
				this.$refs.delProductModal.showModal();
			}
		},
	},
	mounted() {
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		axios.defaults.headers.common.Authorization = token;
		this.checkAdmin();
		this
	},
});
app.mount('#app');