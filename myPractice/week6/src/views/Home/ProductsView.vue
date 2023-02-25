<template>
    <div class="container">
      <div class="mt-4">
        <!-- 產品Modal -->
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, id) in products" :key="id">
              <td style="width: 200px">
                <div style="height: 100px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${ product.imageUrl })` }"></div>
              </td>
              <td>
                {{ product.title }}
              </td>
              <td>
                <div v-if="!product.price" class="h5">{{ product.origin_price }} 元</div>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button @click.prevent="getDetail(product)" type="button"
                  class="btn btn-outline-secondary">
                    <i v-if="loadingItem === product.id" class="fas fa-spinner fa-pulse"></i>
                    查看更多
                  </button>
                  <router-link :to="`/product/${product.id}`"
                  class="btn btn-outline-primary">開啟單一產品頁面</router-link>
                  <button @click.prevent="addToCart(product)" type="button"
                  class="btn btn-outline-danger">
                    <i v-if="loadingItem === product.id" class="fas fa-spinner fa-pulse"></i>
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ProductDetailModal :product="productDetail" @add-to-cart="addToCart"
          ref="productDetailModal"></ProductDetailModal>
      </div>
    </div>
</template>
<script>
import ProductDetailModal from '@/components/ProductDetailModal.vue';

export default {
  name: 'ProductsView',
  data() {
    return {
      products: [],
      productDetail: {},
      loadingItem: '',
    };
  },
  components: {
    ProductDetailModal,
  },
  mounted() {
    // const loader = this.$loading.show();
    this.getProducts();
    // loader.hide();
  },
  methods: {
    getProducts() {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/products`;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getDetail(product) {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/product/${product.id}`;
      this.loadingItem = product.id;
      this.$http.get(api)
        .then((res) => {
          this.productDetail = res.data.product;
          this.$refs.productDetailModal.showModal();
          this.loadingItem = '';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(product, qty = 1) {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/cart`;
      const data = {
        product_id: product.id,
        qty,
      };
      this.loadingItem = product.id;
      this.$http.post(api, { data })
        .then((res) => {
          alert(res.data.message);
          this.loadingItem = '';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
