<template>
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal">
          登入
        </h1>
        <div class="col-8">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input v-model="user.username" type="email"
               class="form-control" id="username" placeholder="name@example.com" required autofocus>
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input v-model="user.password" type="password" class="form-control"
               id="password" placeholder="Password" required>
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
            <router-link to="/" class="btn btn-lg btn-secondary w-100 mt-3" >回到前台</router-link>
          </form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted">
        &copy; 2023~∞ - 六角學院
      </p>
    </div>
    <router-view></router-view>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const api = `${import.meta.env.VITE_API}/v2/admin/signin`;
      this.$http.post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/`;
          this.$router.push('/admin/products');
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
