<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="order in orders" :key="order.id">
        <tr :class="{'text-secondary': !order.is_paid}">
          <td>{{ order.create_at }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <ul>
              <li v-for="product in order.products" :key="product.id">
                {{ product.product.title }}數量:{{ product.product.num }}{{product.product.unit }}
              </li>
            </ul>
          </td>
          <td class:="text-right">{{ order.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input type="checkbox" class="form-check-input"
              v-model="order.is_paid"
              @change="updatePaid(order)"
              :id="`isPaid${order.id}`" >
              <label class="form-check-label"  :for="`isPaid${order.id}`">
                <span v-if="order.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button @click="openModal('edit',order)"
              class="btn btn-outline-primary btn-sm"
                type="button">
                檢視
              </button>
              <button @click="openModal('delete',order)"
              class="btn btn-outline-danger btn-sm"
                type="button">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
  </tbody>
  </table>
  <!--PaginationModal Modal -->
  <PaginationModal :pagination="pagination"
   @emit-page="getOrders"> </PaginationModal>
   <!-- Modal -->
    <!-- productModal Modal -->
  <OrderModal :temp-order="tempOrder" ref="orderModal"
      @update-paid="updatePaid"></OrderModal>
    <!-- Modal -->
    <!--  DelModal Modal -->
    <DelModal :item="tempOrder" ref="delModal"
    :type="'order'"
      @get-item="getOrders"></DelModal>
    <!--Modal -->
</template>
<script>
import PaginationModal from '@/components/PaginationModal.vue';
import DelModal from '@/components/DelModal.vue';
import OrderModal from '@/components/OrderModal.vue';

export default {
  data() {
    return {
      test: '',
      orders: {},
      pagination: {},
      tempOrder: {},
    };
  },
  components: { PaginationModal, DelModal, OrderModal },
  mounted() {
    // eslint-disable-next-line no-useless-escape
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
  methods: {
    updatePaid(order) {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/admin/order/${order.id}`;
      const data = {
        is_paid: order.is_paid,
      };
      this.$http.put(api, { data })
        .then((res) => {
          alert(res.data.message);
          this.$refs.orderModal.hideModal();
          this.getOrders();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(state, order) {
      if (state === 'edit') {
        this.tempOrder = { ...order };
        this.$refs.orderModal.showModal();
      } else if (state === 'delete') {
        this.tempOrder = { ...order };
        this.$refs.delModal.showModal();
      }
    },
    getOrders(pageNum = 1) {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/admin/orders?page=${pageNum}`;
      this.$http.get(api)
        .then((res) => {
          const { orders, pagination } = res.data;
          this.orders = { ...orders };
          this.pagination = { ...pagination };
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    checkAdmin() {
      const api = `${import.meta.env.VITE_API}/v2/api/user/check`;
      this.$http.post(api)
        .then(() => {
          this.getOrders();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
