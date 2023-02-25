<template>
   <div class="home">
      <h1>前台</h1>
      <div id="nav">
         <router-link to="/" >首頁</router-link> |
         <router-link to="/products">前台產品列表</router-link> |
         <router-link to="/cart" >前台購物車</router-link> |
         <router-link to="/about">關於我</router-link> |
         <router-link to="/login">後台登入</router-link>
      </div>
      <router-view></router-view>
   </div>
</template>
