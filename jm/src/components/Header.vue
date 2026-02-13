<script setup lang="ts">
import Logo from './Logo.vue';

</script>

<template>
    <header class="routes">
    <Logo />

    <nav>
      <div class="job-container">
        <RouterLink to="/jobs">Для роботошукача</RouterLink>
        <RouterLink to="/empl">Для роботодавця</RouterLink>
      </div>
      
      

      <RouterLink to="/admin-panel/instructions">Для адміна</RouterLink>
    </nav>
    
  </header>
</template>

<style>
  header {
    display: flex;
    align-items: center;
    padding: var(--padding-main);
    background: #fff;
    border-radius: var(--radius-main);
    gap: 20px;
    position: sticky;
    top: 0;
    left: 0;
    height: 60px;
  }

  nav {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    gap: 80px;
  }

  .job-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
</style>