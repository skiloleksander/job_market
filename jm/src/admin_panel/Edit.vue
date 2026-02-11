<script setup>
import { onMounted, ref } from 'vue'
import { db } from '../firebase/firebase'
import { collection, getDocs, addDoc, updateDoc } from 'firebase/firestore'
import { slugify } from '../firebase/firebase'
import { useRouter } from 'vue-router'

const router = useRouter()

const types = ref([])
const categories = ref([])
const regions = ref([])
const skills = ref([])
const languagesList = ref([])
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
  description: '',
  title: '',

  languages: [
    { language: '', grade: '' }
  ],

  skills: [
    { skill: '' }
  ],

  bonuses: [
    { bonus: '' }
  ]
})



const publishJob = async () => {
  try {
    const slug = slugify(propsToPush.value.title)

    const skillsString = propsToPush.value.skills
      .map(item => item.skill)
      .join(',')

    const languagesString = propsToPush.value.languages
      .map(item => item.language)
      .join(',')

    const gradesString = propsToPush.value.languages
      .map(item => item.grade)
      .join(',')

    const bonusesString = propsToPush.value.bonuses
      .map(item => item.bonus)
      .join(',')
      
    const docRef = await addDoc(collection(db, "vacancy"), {
      title: propsToPush.value.title,
      salary_min: propsToPush.value.salary_min,
      salary_max: propsToPush.value.salary_max,
      category: propsToPush.value.category,
      type: propsToPush.value.type,
      region: propsToPush.value.region,
      skills: skillsString,
      languages: languagesString,
      grades: gradesString,
      bonuses: bonusesString,
      description: propsToPush.value.description,
      email: propsToPush.value.email,
      phone: propsToPush.value.phone,
      status: 'active'
    })

    const finalSlug = `${slug}-${docRef.id}`

    await updateDoc(docRef, {
      slug: finalSlug
    })

    router.push({
      name: 'VacancyFull',
      params: { slug: finalSlug }
    })

  } catch (err) {
    console.error("Publish error:", err)
  }
}

const addLanguage = () => {
  propsToPush.value.languages.push({
    language: '',
    grade: ''
  })
}

const addSkill = () => {
  propsToPush.value.skills.push({
    skill: ''
  })
}

const addBonus = () => {
  propsToPush.value.bonuses.push({
    bonus: ''
  })
}

const removeItem = (arrayName, index) => {
  propsToPush.value[arrayName].splice(index, 1)
}


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
  skills.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

const getLanguages = async () => {
  const snap = await getDocs(collection(db, 'language'))
  languagesList.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

const getGrades = async () => {
  const snap = await getDocs(collection(db, 'grade'))
  grades.value = snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }))
}

const getBonuses = async () => {
  const snap = await getDocs(collection(db, 'bonus'))
  bonuses.value = snap.docs.map(doc => ({
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
  <form @submit.prevent="">

    <div class="form-wrapper">

      <div class="grid-section">
        <input placeholder="Title" v-model="propsToPush.title" />

        <input type="number"
               placeholder="Minimum salary"
               v-model.number="propsToPush.salary_min" />

        <input type="number"
               placeholder="Maximum salary"
               v-model.number="propsToPush.salary_max" />

        <select v-model="propsToPush.category">
          <option value="">Select category</option>
          <option v-for="category in categories"
                  :key="category.id"
                  :value="category.name">
            {{ category.name }}
          </option>
        </select>

        <select v-model="propsToPush.type">
          <option value="">Select type</option>
          <option v-for="type in types"
                  :key="type.id"
                  :value="type.name">
            {{ type.name }}
          </option>
        </select>

        <select v-model="propsToPush.region">
          <option value="">Select region</option>
          <option v-for="region in regions"
                  :key="region.id"
                  :value="region.name">
            {{ region.name }}
          </option>
        </select>
      </div>

      <div class="block-section">
        <h3>Skills</h3>

        <div v-for="(item, index) in propsToPush.skills"
             :key="index"
             class="row">
          <select v-model="item.skill">
            <option value="">Select skill</option>
            <option v-for="skill in skills"
                    :key="skill.id"
                    :value="skill.name">
              {{ skill.name }}
            </option>
          </select>

          <button type="button"
                  @click="removeItem('skills', index)">
            Remove
          </button>
        </div>

        <button type="button"
                class="add-btn"
                @click="addSkill">
          Add Skill
        </button>
      </div>

      <div class="block-section">
        <h3>Languages</h3>

        <div v-for="(item, index) in propsToPush.languages"
             :key="index"
             class="row">
          <select v-model="item.language">
            <option value="">Select language</option>
            <option v-for="lang in languagesList"
                    :key="lang.id"
                    :value="lang.name">
              {{ lang.name }}
            </option>
          </select>

          <select v-model="item.grade">
            <option value="">Select grade</option>
            <option v-for="grade in grades"
                    :key="grade.id"
                    :value="grade.name">
              {{ grade.name }}
            </option>
          </select>

          <button type="button"
                  @click="removeItem('languages', index)">
            Remove
          </button>
        </div>

        <button type="button"
                class="add-btn"
                @click="addLanguage">
          Add language
        </button>
      </div>

      <div class="block-section">
        <h3>Bonuses</h3>

        <div v-for="(item, index) in propsToPush.bonuses"
             :key="index"
             class="row">
          <select v-model="item.bonus">
            <option value="">Select bonus</option>
            <option v-for="bonus in bonuses"
                    :key="bonus.id"
                    :value="bonus.name">
              {{ bonus.name }}
            </option>
          </select>

          <button type="button"
                  @click="removeItem('bonuses', index)">
            Remove
          </button>
        </div>

        <button type="button"
                class="add-btn"
                @click="addBonus">
          Add Bonus
        </button>
      </div>


      <div class="block-section bottom">
          <textarea placeholder="Description" v-model="propsToPush.description"></textarea>
          <div class="contacts">
            <input placeholder="Email" type="text" v-model="propsToPush.email"/>
            <input placeholder="Phone" type="text" v-model="propsToPush.phone"/>
          </div>
          
      </div>

      <button class="publish-btn" @click="publishJob">
        Publish
      </button>

    </div>
  </form>
</template>

<style scoped>

.form-wrapper {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.05);
}

.grid-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.block-section {
  margin-bottom: 40px;
}

.block-section h3 {
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
}

.row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

input, select {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 12px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f6f6f6;
  font-size: 16px;
  resize: none;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
}

.bottom {
  display: flex;
}

.contacts input {
  margin: var(--margin-small);
}

button {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.add-btn {
  background: #38b548;
}

.publish-btn {
  width: 100%;
  padding: 14px;
  background: #3b82f6;
  color: white;
  margin-top: 20px;
}

button {
  padding: 10px;
  background: #3b82f6;
  color: white;
}

@media (max-width: 768px) {
  .grid-section {
    grid-template-columns: 1fr;
  }

  .row {
    flex-direction: column;
  }
}

</style>
