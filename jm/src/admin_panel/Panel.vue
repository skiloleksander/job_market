<script setup lang="ts">
import Logo from '../components/Logo.vue';

</script>

<template>
  <section class="admin-content">
    <aside>
      <Logo />
      <RouterLink :to="{name: 'Instructions'}"><i class="fa-solid fa-chalkboard-user"></i>Інструкції</RouterLink>
      <RouterLink :to="{ name: 'Edit' }"><i class="fa-solid fa-pen-to-square"></i>Редагувати та Публікувати</RouterLink>
      <RouterLink :to="{ name: 'Vacancy' }"><i class="fa-solid fa-list"></i>Вакансії</RouterLink>
      <RouterLink :to="{ name: 'Sended' }"><i class="fa-solid fa-inbox"></i>Надіслані вакансії</RouterLink>
  </aside>
    <RouterView />
  </section>
  
</template>

<style scoped>
  .admin-content {
    display: flex;
  }
  aside {
    position: sticky;
    top: 0;
    left: 0;
    border: 1px solid #fff;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100vh;

    margin-right: 50px;

    a {
      padding: 10px;
    }
    i {
      padding-right: 10px;
    }
  }
</style>