<script setup>
import { onMounted, ref, watch } from 'vue'
import { db } from '../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

const types = ref([])
const categories = ref([])
const regions = ref([])

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

const getRegions = async () => {
  const snap = await getDocs(collection(db, 'region'))
  regions.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

onMounted(() => {
  getTypes()
  getCategories()
  getRegions()
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

const emit = defineEmits(['apply'])

watch(filters, () => {
  emit('apply', { ...filters.value })
}, { deep: true })

</script>

<template>
  <form class="filters">
    <h3>Шукайте вакансію швидше за допомогою фільтрів</h3>

    <label>
      Категорія:
      <select v-model="filters.category">
        <option value="">Всі категорії</option>
        <option v-for="category in categories" :key="category.id" :value="category.name">
          {{ category.name }}
        </option>
      </select>
    </label>

    <label>
      Мінімальна зарплата: {{ filters.salary_min }}
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        v-model.number="filters.salary_min"
      />
    </label>

    <label>
      Максимальна зарплата: {{ filters.salary_max }}
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        v-model.number="filters.salary_max"
      />
    </label>

    <label>
      Тип зайнятості:
      <select v-model="filters.type">
        <option value="">Всі типи</option>
        <option v-for="type in types" :key="type.id" :value="type.name">
          {{ type.name }}
        </option>
      </select>
    </label>

    <label>
      Регіон:
      <select v-model="filters.region">
        <option value="">Всі регіони</option>
        <option v-for="region in regions" :key="region.id" :value="region.name">
          {{ region.name }}
        </option>
      </select>
    </label>
  </form>
</template>
