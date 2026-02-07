<script setup>
import { onMounted, ref} from 'vue'
import { db } from '../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

const types = ref([])
const categories = ref([])
const regions = ref([])
const skills = ref([])
const languages = ref([])
const grades = ref([])
const bonuses = ref([])

const propsToPush = ref({
  salary_min: 0,
  salary_max: 10000,
  category: '',
  type: '',
  region: '',
  email: '',
  phone: '',
  decription: '',
  title: '',
  skills: '',
  language: '',
  grade: '',
  bonus: ''
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

const getSkills = async () => {
  const snap = await getDocs(collection(db, 'skill'))
  categories.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

const getLanguages = async () => {
  const snap = await getDocs(collection(db, 'language'))
  categories.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

const getGrades = async () => {
  const snap = await getDocs(collection(db, 'grade'))
  categories.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

const getBonuses = async () => {
  const snap = await getDocs(collection(db, 'bonus'))
  categories.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

onMounted(() => {
  getTypes()
  getCategories()
  getRegions()
  getBonuses()
  getGrades()
  getLanguages()
  getSkills()
})

</script>

<template>
    <!-- pushVacancy - cloud Function -->
    <form @submit.prevent="">
        <!-- main info container -->
         <div class="main-info_container">
            <input placeholder="Title" type="text" v-model="propsToPush.title">
            <input placeholder="Minimum salary" type="number" v-model="propsToPush.salary_min">
            <input placeholder="Maximum salary" type="number" v-model="propsToPush.salary_max">
            <div class="conditional">
               <input placeholder="Category of job" type="text" v-model="propsToPush.category">
                <select v-model="propsToPush.category">
                    <option value="">All categories</option>
                    <option v-for="category in categories" :key="category.id" :value="category.name">
                      {{ category.name }}
                    </option>
                </select>
            </div>

            <div class="conditional">
               <input placeholder="Type of job" type="text" v-model="propsToPush.type">
                <select v-model="propsToPush.type">
                    <option value="">All types</option>
                    <option v-for="type in types" :key="type.id" :value="type.name">
                      {{ type.name }}
                    </option>
                </select>
            </div>

            <div class="conditional">
               <input placeholder="Region of job" type="text" v-model="propsToPush.region">
                <select v-model="propsToPush.region">
                    <option value="">All regions</option>
                    <option v-for="region in regions" :key="region.id" :value="region.name">
                      {{ region.name }}
                    </option>
                </select>
            </div>
         </div>

         
    </form>

    <button>Publish</button>
</template>

<style scoped>


    button {
        width: 100px;
        height: 30px;
    }
</style>