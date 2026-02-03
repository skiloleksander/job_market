<script setup lang="ts">
import Logo from '../components/Logo.vue';

</script>

<template>
  <Logo />
  <aside>
    <RouterLink :to="{ name: 'Publish' }">Publish</RouterLink>
    <RouterLink :to="{ name: 'Edit' }">Edit</RouterLink>
    <RouterLink :to="{ name: 'Vacancy' }">Vacancies</RouterLink>
    <RouterLink :to="{ name: 'Sended' }">Sended vacancies</RouterLink>
  </aside>

  <RouterView />
</template>