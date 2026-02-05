<script setup lang="ts">

    defineProps({
        title: String,
        salary_min: Number,
        salary_max: Number,
        category: String,
        region: String,
        skills: {
            type: Array,
            default: () => [] 
        },
        languages: {
            type: Array,
            default: () => [] 
        },
        grade: {
            type: Array,
            default: () => [] 
        }
    })
</script>

<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>Salary: {{ salary_min }} - {{ salary_max }}</p>
        <p>Category: {{ category }}</p>
        <p>Region: {{ region }}</p>
        <div v-if="skills && skills.length">
            <h3>Skills:</h3>
            <ul>
                <li v-for="(skill, index) in skills" :key="index">{{ skill }}</li>
            </ul>
        </div>
        <div v-if="languages && languages.length">
            <h3>Languages:</h3>
            <ul>
                <li v-for="(language, index) in languages" :key="index">{{ language }}</li>
            </ul>
        </div>
        <div v-if="grade && grade.length">
            <h3>Grade:</h3>
            <ul>
                <li v-for="(g, index) in grade" :key="index">{{ g }}</li>
            </ul>
        </div>
        <!-- TODO: Fuse Languages and Grade into {{ language }} {{ g }} -->
    </div>
</template>