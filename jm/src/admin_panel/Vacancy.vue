<script setup>
import Card from '../components/Card.vue';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, where, updateDoc,doc } from 'firebase/firestore';
import { ref, onMounted,computed } from 'vue';

const cards = ref([]);
const search = ref('')

const Active = ref(true)
const Inactive = ref(true)

const mapCards = (doc) => {
  const data = doc.data();
  const skillsStr = data.skills || "";
  const languagesStr = data.languages || "";
  const gradesStr = data.grades || "";
  
  return {
    id: doc.id,
    title: data.title,
    salary_min: data.salary_min,
    salary_max: data.salary_max,
    category: data.category,
    region: data.region,
    status: data.status || 'active',
    skills: skillsStr ? skillsStr.split(',').map(s => s.trim()) : [],
    languages: languagesStr ? languagesStr.split(',').map(l => l.trim()) : [],
    grade: gradesStr ? gradesStr.split(',').map(g => g.trim()) : []
  }
}

const fetchCards = async (filters = {}) => {
  const cardsCollection = collection(db, 'vacancy');
  try {
    const querySnapshot = await getDocs(cardsCollection);
    let results = querySnapshot.docs.map(mapCards);

    cards.value = results;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    if (error.code === 'failed-precondition') {
        alert("Check console specifically for the index creation link!");
    }
  }
}

const filtredVacancies = computed(() => {
  return cards.value.filter(card => {
    if(card.status === 'active' && !Active.value) return false
    if(card.status === 'inactive' && !Inactive.value) return false

    return true
  }).filter(card => {
    return card.title.toLowerCase().includes(search.value.toLowerCase())
  })
})

const toggleStatus = (status) => {
  return status === 'active' ? 'inactive' : 'active'
}

const changeState = async (card) => {
  try {
    const newStatus = toggleStatus(card.status)

    const docRef = doc(db, 'vacancy', card.id)

    await updateDoc(docRef, {
      status: newStatus
    })

    card.status = newStatus 
    console.log("State changed successfully")

  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchCards();
});

</script>

<template>
  <div class="admin-vacancyes_container">
    <section class="top">
      <h2>Всі вакансії:</h2>
      <input placeholder="Пошук за назвою" type="text" v-model="search"/>
      <div class="check-status">
        <input type="checkbox" v-model="Inactive"/>
        <p>Показати всі неактивні вакансії</p>
      </div>

      <div class="check-status">
        <input type="checkbox" v-model="Active"/>
        <p>Показати всі активні вакансії</p>
      </div>
    </section>
    
    

    <div class="admin-cards">
      <Card v-for="card in filtredVacancies" :key="card.id"
      :title="card.title"
      :salary_min="card.salary_min"
      :salary_max="card.salary_max"
      :category="card.category"
      :region="card.region"
      :languages="card.languages"
      :skills="card.skills"
      :grade="card.grade"
    >
      <button class="vacancy-btn">Редагувати</button>
      <button @click="changeState(card)">
        {{ card.status === 'active' ? 'Деактивувати' : 'Активувати' }}
      </button>
      <button class="vacancy-btn">Видалити</button>   
    </Card>
    </div>

    
  </div>
</template>

<style>
  .admin-cards {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 50px;
  }

  .top {
    background: #fff;
    border-radius: var(--radius-main);
    padding: var(--padding-main);
    margin-bottom: 40px;
    display: flex;
    align-items: center;
  }

  .vacancy-btn {
    min-width: 120px;
    height: 30px;
    margin: 10px;
  }

  input[type = 'text']{
    width: 200px;
    margin: var(--margin-main);
    padding: var(--padding-small);
    border-radius: var(--radius-main);
    border: 1px solid #00000058;
  }

  input:focus {
    outline: none;
    border-color: #3b82f6;
  }

  .check-status {
    display: flex;
    padding: var(--padding-small);
  }
</style>