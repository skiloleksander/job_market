<script setup>
import Card from '../components/Card.vue';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

const cards = ref([]);

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

onMounted(() => {
  fetchCards();
});

</script>

<template>
  <div class="admin-vacancyes_container">
    <section class="top">
      <h2>All vacancies:</h2>
      <input placeholder="Search by name" type="text" />
      <div class="check-status">
        <input type="checkbox" />
        <p>Show all disactivated vacancyes</p>
      </div>

      <div class="check-status">
        <input type="checkbox" />
        <p>Show all activated vacancyes</p>
      </div>
    </section>
    
    

    <div class="admin-cards">
      <Card v-for="card in cards" :key="card.id"
      :title="card.title"
      :salary_min="card.salary_min"
      :salary_max="card.salary_max"
      :category="card.category"
      :region="card.region"
      :languages="card.languages"
      :skills="card.skills"
      :grade="card.grade"
    >
      <button class="vacancy-btn">Edit</button>
      <button class="vacancy-btn">Disactivate/Activate</button>   
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
  }

  .check-status {
    display: flex;
    padding: var(--padding-small);
  }
</style>