<script setup>
import Card from '../components/Card.vue';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

const cards = ref([]);

async function fetchItemsByIds(collectionName, ids) {
  if (!ids || ids.length === 0) return [];
  const batches = [];
  while (ids.length) {
    const batch = ids.splice(0, 10);
    batches.push(batch);
  }

  let results = [];
  for (const batch of batches) {
    const q = query(collection(db, collectionName), where("name", "in", batch));
    const querySnapshot = await getDocs(q);
    results = results.concat(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }
  return results;
}

const fetchCards = async () => {
  const querySnapshot = await getDocs(collection(db, 'vacancy'));
  const rawCards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const cardsWithDetails = await Promise.all(
    rawCards.map(async card => {
      const regions = await fetchItemsByIds('region', [...(card.region || [])]);
      const languages = await fetchItemsByIds('language', [...(card.languages || [])]);
      const skills = await fetchItemsByIds('skill', [...(card.skills || [])]);

      return {
        ...card,
        regions,
        languages,
        skills,
      };
    })
  );

  cards.value = cardsWithDetails;
};

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
      :regions="card.regions"
      :languages="card.languages"
      :skills="card.skills"
      :grade="card.grade"
    />
  </div>
</template>