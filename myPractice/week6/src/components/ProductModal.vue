<template>
  <div id="productModal" ref="productModal"
   class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>{{isNew? '新增產品': '編輯產品'}}</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
             aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="" class="form-label"> 主要圖片</label>
                    <input v-model="product.imageUrl" type="text"
                     class="form-control" placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="product.imageUrl" alt="">
                </div>
                <div class="mb-2" v-for="(imageUrl,index) in product.imagesUrl" :key="imageUrl">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <input v-model="product.imagesUrl[index]" type="text" class="form-control"
                      placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="imageUrl" alt="">
                </div>
                <div
                  v-if="!product.imagesUrl || 0 === product.imagesUrl.length
                   || product.imagesUrl[product.imagesUrl.length - 1]">
                  <button @click="addTempImageUrl" class="btn btn-outline-primary
                   btn-sm d-block w-100">
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button @click="product.imagesUrl.pop()"
                   class="btn btn-outline-danger btn-sm d-block w-100">
                    刪除圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input v-model="product.title" id="title" type="text"
                   class="form-control" placeholder="請輸入標題">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input v-model="product.category" id="category"
                     type="text" class="form-control"
                      placeholder="請輸入分類">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input v-model="product.unit" id="unit" type="text"
                     class="form-control" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input v-model.number="product.origin_price"
                     id="origin_price" type="number" min="0"
                      class="form-control" placeholder="請輸入原價">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input v-model.number="product.price" id="price"
                     type="number" min="0" class="form-control"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea v-model="product.description" id="description"
                   type="text" class="form-control"
                    placeholder="請輸入產品描述">
                      </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea v-model="product.content" id="content"
                   type="text" class="form-control"
                    placeholder="請輸入說明內容">
                      </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input v-model="product.is_enabled" id="is_enabled"
                     class="form-check-input" type="checkbox"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button @click="updateProduct" type="button" class="btn btn-primary">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      productModal: {},
      product: {},
    };
  },
  props: ['tempProduct', 'isNew'],
  emits: ['getData'],
  watch: {
    tempProduct() {
      this.product = { ...this.tempProduct };
    },
  },
  methods: {
    updateProduct() {
      let httpMethod = 'post';
      let api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/admin/product`;
      if (!this.isNew) {
        httpMethod = 'put';
        api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/admin/product/${this.tempProduct.id}`;
      }
      this.$http[httpMethod](api, { data: this.product })
        .then((res) => {
          alert(res.data.message);
          this.productModal.hide();
          this.$emit('getData');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    showModal() {
      this.productModal.show();
    },
    hideModal() {
      this.productModal.hide();
    },
    addTempImageUrl() {
      if (!this.product.imagesUrl) {
        this.product.imagesUrl = [];
      }
      this.product.imagesUrl.push('');
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal);
  },
};
</script>
