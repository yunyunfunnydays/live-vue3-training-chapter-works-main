<template>
  <div class="modal-body">
    <div class="row">
      <div class="col-sm-6">
        <img class="img-fluid" :src="product.imagesUrl" alt="">
      </div>
      <div class="col-sm-6">
        <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
        <p>商品描述：{{ product.description }}</p>
        <p>商品內容：{{ product.content }}</p>
        <div v-if="!product.price" class="h5">{{ product.origin_price }} 元</div>
        <del class="h6">原價 {{ product.origin_price }} 元</del>
        <div class="h5">現在只要 {{ product.price }} 元</div>
        <div class="input-group">
          <input v-model="gty" type="number" class="form-control" min="1">
          <button @click.prevent="addToCart(product)"
            type="button" class="btn btn-primary">加入購物車</button>
        </div>
        <button @click.prevent="go">回前頁</button>
      </div>
      <!-- col-sm-6 end -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: '',
      gty: 1,
    };
  },
  props: ['id'],
  methods: {
    addToCart(product) {
      this.$emit('addToCart', product, this.gty);
      this.hideModal();
    },
    getDetail() {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/product/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    go() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
