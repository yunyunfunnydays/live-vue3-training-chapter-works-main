<template>
  <h3>
    後台頁面
  </h3>
  <div id="nav">
    <router-link to="/">回到前台</router-link> |
    <router-link to="/admin/products">後台產品列表</router-link> |
    <router-link to="/admin/orders">後台訂單</router-link> |
    <router-link to="/">登出</router-link> |
  </div>
  <router-view></router-view>
</template>
