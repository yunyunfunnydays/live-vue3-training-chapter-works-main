import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const app = createApp({
	data() {
		return {
			apiUrl: 'https://vue3-course-api.hexschool.io/',
			apiPath: 'colorfool',
			products: [],
			tempProduct: {},
		}
	},
	methods: {
		checkAdmin() {
			const url = `${this.apiUrl}v2/api/user/check`;
			axios.post(url)
				.then(() => {
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
					window.location = 'login.html';
				})
		},
		getData() {
			const url = `${this.apiUrl}v2/api/${this.apiPath}/admin/products`;
			axios.get(url)
				.then((res) => {
					this.products = res.data.products;
				})
				.catch((err) => {
					alert(err.response.data.message);
				})
		},
		openProduct(item) {
			this.tempProduct = item;
			console.log(this.tempProduct);
		},
	},
	mounted() {
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
		axios.defaults.headers.common.Authorization = token;
		this.checkAdmin();
	}
});
app.mount('#app');