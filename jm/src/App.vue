<script setup lang="ts">
import { useRoute } from 'vue-router';

  const route = useRoute();
</script>

<template>
  <header class="routes">
    <RouterLink to="/" class="logo">
      <img src="#" alt="#">
      <h3>Logo</h3>
    </RouterLink>

    <nav>
      <div class="job-container">
        <RouterLink to="/jobs">Для роботошукача</RouterLink>
        <RouterLink to="/empl">Для роботодавця</RouterLink>
      </div>
      
      

      <RouterLink to="#">Для адміна</RouterLink>
    </nav>
    
  </header>
      <section class="main-content" v-if="route.path === '/'">
        Home
      </section>
  <RouterView />
</template>

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
