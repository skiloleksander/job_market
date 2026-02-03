<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

  const route = useRoute();
</script>

<template>
      <Header v-if="route.meta.layout !== 'admin'"/>
      <section class="main-content" v-if="route.path === '/'">
        <section class="about"></section>
        <section class="hot-vacancyes"></section>
        <section class="other"></section>
        <Footer />  
      </section>
      <RouterView class="main-view" />
</template>

<!-- MMM -->

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

a {
  width: 100px;
  height: 20px;
}
</style>
