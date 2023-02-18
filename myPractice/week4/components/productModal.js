const productModal = {
  data() {
    return {
      productModal,
    }
  },
  props: ['tempProduct', 'api', 'isNew'],
  emits: ['getData'],
  methods: {
    updateProduct() {
      let httpMethod = 'post';
      if (!this.isNew) {
        httpMethod = 'put';
      }
      axios[httpMethod](this.api, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.productModal.hide();
          this.$emit('getData');
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    showModal() {
      this.productModal.show();
    },
    hideModal() {
      this.productModal.hide();
    },
    addTempImageUrl() {
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      this.tempProduct.imagesUrl.push('');
    },
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal);
  },
  template: `
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>{{isNew? '新增產品': '編輯產品'}}</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="" class="form-label"> 主要圖片</label>
                    <input v-model="tempProduct.imageUrl" type="text" class="form-control" placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                </div>
                <div class="mb-2" v-for="(imageUrl,index) in tempProduct.imagesUrl" :key="imageUrl">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <input v-model="tempProduct.imagesUrl[index]" type="text" class="form-control"
                      placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="imageUrl" alt="">
                </div>
                <div
                  v-if="!tempProduct.imagesUrl || 0 === tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                  <button @click="addTempImageUrl" class="btn btn-outline-primary btn-sm d-block w-100">
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button @click="tempProduct.imagesUrl.pop()" class="btn btn-outline-danger btn-sm d-block w-100">
                    刪除圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input v-model="tempProduct.title" id="title" type="text" class="form-control" placeholder="請輸入標題">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input v-model="tempProduct.category" id="category" type="text" class="form-control"
                      placeholder="請輸入分類">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input v-model="tempProduct.unit" id="unit" type="text" class="form-control" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input v-model="tempProduct.origin_price" id="origin_price" type="number" min="0"
                      class="form-control" placeholder="請輸入原價">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input v-model="tempProduct.price" id="price" type="number" min="0" class="form-control"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea v-model="tempProduct.description" id="description" type="text" class="form-control"
                    placeholder="請輸入產品描述">
                      </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea v-model="tempProduct.content" id="content" type="text" class="form-control"
                    placeholder="請輸入說明內容">
                      </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input v-model="tempProduct.is_enabled" id="is_enabled" class="form-check-input" type="checkbox"
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
    `,
};

export { productModal };