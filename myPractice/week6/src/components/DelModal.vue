<template>
  <div id="delModal" ref="delModal" class="modal fade" tabindex="-1"
        aria-labelledby="delModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close"
               data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong v-if="item.title" class="text-danger">{{ item.title }}</strong>(刪除後將無法恢復)。
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
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      delModal: '',
    };
  },
  props: ['item', 'type'],
  emits: ['getItem'],
  methods: {
    delProduct() {
      let api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/admin/product/${this.item.id}`;
      if (this.type === 'order') {
        api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/admin/order/${this.item.id}`;
      }
      this.$http.delete(api)
        .then((res) => {
          alert(res.data.message);
          this.delModal.hide();
          this.$emit('getItem');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    showModal() {
      this.delModal.show();
    },
    hideModal() {
      this.delModal.hide();
    },
  },
  mounted() {
    this.delModal = new Modal(this.$refs.delModal);
  },
};
</script>
