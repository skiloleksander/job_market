<script setup>
import Card from '../components/Card.vue';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

const cards = ref([]);
const raw_skills = ref();

const fetchCards = async () => {
  const cardsCollection = collection(db, 'vacancy');
  const q = query(cardsCollection, where('status', '==', 'active'));
  const querySnapshot = await getDocs(q);
  cards.value = querySnapshot.docs.map(doc => {
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
  });
}

onMounted(() => {
  fetchCards();
});

</script>

<template>
  jobs page
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