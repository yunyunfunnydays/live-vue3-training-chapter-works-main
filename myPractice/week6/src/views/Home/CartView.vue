<template>
  <div class="container">
      <div class="mt-4">
        <!-- 購物車列表 -->
        <div class="text-end">
          <button @click.prevent="delCartAll"
            class="btn btn-outline-danger" type="button">
            清空購物車
          </button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="(item, id) in cart.carts" :key="id">
                <td>
                  <button @click="delCartItem(item)"
                   type="button" class="btn btn-outline-danger btn-sm">
                    <i v-if="loadingItem === item.id" class="fas fa-spinner fa-pulse"></i>
                    x
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div v-if="item.coupon" class="text-success">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <input @blur="updateCart(item)"
                        v-model="item.qty" min="1" type="number" class="form-control">
                      <span class="input-group-text" id="basic-addon2"></span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="item.coupon" class="text-success">折扣價：</small>
                  {{ item.total }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cart.total }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="my-5 row justify-content-center">
        <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="checkOut">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VField v-model="userForm.user.email"
             id="email" name="email" type="email" label="email" class="form-control"
             :class="{ 'is-invalid': errors.email }"
             placeholder="請輸入 Email" rules="required|email">
            </VField>
            <v-error-message name="email" class="invalid-feedback"></v-error-message>
          </div>

          <div class="mb-3">
            <label for="userName" class="form-label">收件人姓名</label>
            <VField v-model="userForm.user.name"
             id="userName" name="userName" label="姓名" type="text" class="form-control"
             :class="{ 'is-invalid': errors.userName }" placeholder="請輸入姓名" rules="required">
            </VField>
            <v-error-message name="userName" class="invalid-feedback"></v-error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField v-model="userForm.user.tel" name="tel" label="電話"
            type="tel" class="form-control"
              :class="{ 'is-invalid': errors.tel }"
               placeholder="請輸入電話" rules="required|min:8|max:10">
            </VField>
            <v-error-message name="tel" class="invalid-feedback"></v-error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField v-model="userForm.user.address"
              id="address" name="address" label="地址" type="text" class="form-control"
              :class="{ 'is-invalid': errors.address }" placeholder="請輸入地址" rules="required">
            </VField>
            <v-error-message name="address" class="invalid-feedback"></v-error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea v-model="userForm.message"
            id="message" class="form-control" cols="30" rows="10"></textarea>
          </div>
          <div class="text-end">
            <button :disabled="0 === cart.carts.length"
             type="submit"  class="btn btn-danger">
             送出訂單
            </button>
          </div>
        </VForm>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      cart: {
        carts: '',
        total: '',
        final_total: '',
      },
      userForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      loadingItem: '',
    };
  },
  methods: {
    getCart() {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    updateCart(item) {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/cart/${item.id}`;
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.$http.put(api, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delCartItem(item) {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/cart/${item.id}`;
      this.loadingItem = item.id;
      this.$http.delete(api)
        .then((res) => {
          alert(`${res.data.message}商品 ${item.product.title}`);
          this.loadingItem = '';
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delCartAll() {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/carts`;
      // const loader = this.$loading.show();
      this.$http.delete(api)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          // loader.hide();
        })
        .catch((err) => {
          this.test = err;
          alert(err.response.data.message);
        });
    },
    checkOut() {
      const api = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_PATH}/order`;
      const data = this.userForm;
      // const loader = this.$loading.show();
      this.$http.post(api, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          // !可 reset form
          this.$refs.form.resetForm();
          this.userForm.message = '';
          // loader.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // const loader = this.$loading.show();
    this.getCart();
    // loader.hide();
  },
};
</script>
