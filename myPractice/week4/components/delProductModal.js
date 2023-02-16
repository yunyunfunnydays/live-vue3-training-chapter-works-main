const delProductModal = {
  template: '#delProductModal',
  data() {
    return {
      delProductModal: '',
    }
  },
  props: ['tempProduct'],
  methods: {
    emit() {
      this.$emit('delProductModal', delProductModal)
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
  },
  mounted() {
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    this.emit()
  },
  template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
        aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button @click="delProduct" type="button" class="btn btn-danger">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div >`,
}
export { delProductModal };