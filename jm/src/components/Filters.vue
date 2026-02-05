<script setup>
import { onMounted, ref, watch } from 'vue'
import { db } from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

const types = ref([])
const categories = ref([])

const filters = ref({
  salary_min: 0,
  salary_max: 10000,
  category: '',
  type: '',
  region: ''
})

const getCategories = async () => {
  const snap = await getDocs(collection(db, 'category'))
  categories.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

const getTypes = async () => {
  const snap = await getDocs(collection(db, 'employmentType'))
  types.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

onMounted(() => {
  getTypes()
  getCategories()
})

watch(() => filters.value.salary_min, (newMin) => {
  if (newMin > filters.value.salary_max) {
    filters.value.salary_max = newMin
  }
})

watch(() => filters.value.salary_max, (newMax) => {
  if (newMax < filters.value.salary_min) {
    filters.value.salary_min = newMax
  }
})
</script>

<template>
  <form class="filters">
    <h3>Find our vacancy faster with filters</h3>

    <label>
      Category:
      <input placeholder="Enter your category" type="text" v-model="filters.category" />
    </label>

    <label>
      Salary Min: {{ filters.salary_min }}
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        v-model.number="filters.salary_min"
      />
    </label>

    <label>
      Salary Max: {{ filters.salary_max }}
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        v-model.number="filters.salary_max"
      />
    </label>

    <label>
      Employment Type:
      <select v-model="filters.type">
        <option value="">All types</option>
        <option v-for="type in types" :key="type.id" :value="type.id">
          {{ type.name }}
        </option>
      </select>
    </label>

    <label>
      Category:
      <select v-model="filters.category">
        <option value="">All categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </label>
  </form>
</template>
