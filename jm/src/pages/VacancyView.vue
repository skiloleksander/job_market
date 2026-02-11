<script setup>
import { useRoute } from 'vue-router'
import FullCard from '../components/FullCard.vue';

const route = useRoute()
const slug = route.params.slug
</script>

<template>
  <FullCard :slug="slug" />
</template>