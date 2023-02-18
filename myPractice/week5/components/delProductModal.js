const delProductModal = {
  data() {
    return {
      delProductModal: '',
    }
  },
  props: ['tempProduct', 'api'],
  emits: ['getData'],
  methods: {
    delProduct() {
      axios.delete(this.api)
        .then((res) => {
          alert(res.data.message);
          this.delProductModal.hide();
          this.$emit('getData');
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    showModal() {
      this.delProductModal.show();
    },
    hideModal() {
      this.delProductModal.hide();
    }
  },
  mounted() {
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
  },
  template: `
  <div></div>
  <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
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
              <strong class="text-danger"></strong>{{tempProduct.title}} (刪除後將無法恢復)。
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
    </div >
  `,
}
export { delProductModal };