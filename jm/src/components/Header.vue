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
      
      

      <RouterLink to="/admin-panel">Для адміна</RouterLink>
    </nav>
    
  </header>
</template>