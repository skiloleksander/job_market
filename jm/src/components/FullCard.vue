<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

const props = defineProps({ slug: String })

const vacancy = ref(null)

onMounted(async () => {
  const q = query(
    collection(db, 'vacancy'),
    where('slug', '==', props.slug)
  )
  const snap = await getDocs(q)
  if (!snap.empty) vacancy.value = snap.docs[0].data()
})
</script>

<template>
  <div v-if="vacancy">
    <h2>{{ vacancy.title }}</h2>
    <p>{{ vacancy.description }}</p>
    <p>Salary: {{ vacancy.salary_min }} - {{ vacancy.salary_max }}</p>
    <p>Skills: {{ vacancy.skills }}</p>
    <p>Languages: {{ vacancy.languages }}</p>
    <p>Grades: {{ vacancy.grades }}</p>
    <p>Bonuses: {{ vacancy.bonuses }}</p>
  </div>
  <div v-else>Loading...</div>
</template>