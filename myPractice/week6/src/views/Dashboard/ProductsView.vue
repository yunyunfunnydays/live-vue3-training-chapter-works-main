<template>
  <div class="container">
      <div class="text-end mt-4">
        <button @click="openModal('addNew')" class="btn btn-primary">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, id) in products" :key="id">
            <td> {{ product.category }} </td>
            <td> {{ product.title }} </td>
            <td class="text-end"> {{product.origin_price}} </td>
            <td class="text-end"> {{product.price}} </td>
            <td>
              <span :class="{'text-success':product.is_enabled}">
                 {{product.is_enabled? '啟用':'未啟用'}}
                 </span>
            </td>
            <td>
              <div class="btn-group">
                <button @click="openModal('edit',product)" type="button"
                 class="btn btn-outline-primary btn-sm">
                  編輯
                </button>
                <button @click="openModal('delete',product)" type="button"
                 class="btn btn-outline-danger btn-sm">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!--PaginationModal Modal -->
      <PaginationModal :pagination="pagination" @emit-page="getData"> </PaginationModal>
      <!-- Modal -->
    </div>
    <!--  productModal Modal -->
    <ProductModal :temp-product="tempProduct" :is-new="isNew" ref="productModal"
      @get-data="getData"></ProductModal>
    <!-- Modal -->
    <!--  DelModal Modal -->
    <DelModal :item="tempProduct" ref="delModal"
      @get-item="getData"></DelModal>
    <!--Modal -->
</template>
<script>

import PaginationModal from '@/components/PaginationModal.vue';
import DelModal from '@/components/DelModal.vue';
import ProductModal from '@/components/ProductModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
    };
  },
  components: { PaginationModal, DelModal, ProductModal },
  methods: {
    checkAdmin() {
      const api = `${import.meta.env.VITE_API}/v2/api/user/check`;
      this.$http.post(api)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    },
    getData(pageNum = 1) {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/admin/products?page=${pageNum}`;
      this.$http.get(api)
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
      if (state === 'addNew') {
        this.tempProduct = {};
        this.isNew = true;
        this.$refs.productModal.showModal();
      } else if (state === 'edit') {
        this.tempProduct = { ...product };
        this.isNew = false;
        this.$refs.productModal.showModal();
      } else if (state === 'delete') {
        this.tempProduct = { ...product };
        this.$refs.delModal.showModal();
      }
    },
  },
  mounted() {
    // eslint-disable-next-line no-useless-escape
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
};
</script>
