<script setup>
import Card from '../components/Card.vue';
import Filters from '../components/Filters.vue';
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
  const constrains = [
    where('status', '==', 'active')
  ];

  if (filters.salary_min && filters.salary_min > 0) {
      constrains.push(where('salary_min', '>=', filters.salary_min));
    }

  if (filters.category) {
      constrains.push(where('category', '==', filters.category));
    }
  
  if (filters.type) {
      constrains.push(where('type', '==', filters.type));
    }

  if (filters.region) {
      constrains.push(where('region', '==', filters.region));
    }

  const cardsCollection = collection(db, 'vacancy');
  const q = query(cardsCollection, ...constrains);
  try {
    const querySnapshot = await getDocs(q);
    let results = querySnapshot.docs.map(mapCards);
    if (filters.salary_max && filters.salary_max < 10000) {
      results = results.filter(v => v.salary_max <= filters.salary_max);
    }

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
  jobs page

  <Filters @apply="fetchCards" />

  <div v-for="card in cards" :key="card.id">
    <Card
      :title="card.title"
      :salary_min="card.salary_min"
      :salary_max="card.salary_max"
      :category="card.category"
      :region="card.region"
      :languages="card.languages"
      :skills="card.skills"
      :grade="card.grade"
    />
  </div>
</template>