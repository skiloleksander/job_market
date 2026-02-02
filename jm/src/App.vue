<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { db } from './firebase/firebase';
import { collection, getDocs, doc } from "firebase/firestore";
import { onMounted, ref } from 'vue';

const users = ref<any[]>([]);

async function fetchUsers() {
  const querySnapshot = await getDocs(collection(db, "bonus"));
  users.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="routes">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/jobs">Jobs</RouterLink>
  </div>

  <div v-for="bonus in users" :key="bonus.id">
    <p>{{ bonus.id }}: {{ bonus.name }}</p>
  </div>

  <RouterView/>
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
