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
        },
        slug: String
    })
    
</script>

<template>
    <div class="card">
        <section>
            <div class="card-top">
            <h2>{{ title }}</h2>
            <p>Salary: {{ salary_min }} - {{ salary_max }}</p>
            <p>Category: {{ category }}</p>
            <p>Region: {{ region }}</p>
        </div>
        
        <div class="card-important">
            <div v-if="skills && skills.length">
                <h3>Skills:</h3>
                <ul>
                    <li v-for="(skill, index) in skills" :key="index">{{ skill }}</li>
                </ul>
            </div>

            <div v-if="languages && languages.length && grade && grade.length">
                <h3>Languages:</h3>
                <ul>
                    <li v-for="(language, index) in languages" :key="index">{{ language }} - {{ grade[index] }}</li>
                </ul>
            </div>
        </div>

        </section>
        
        <div class="buttons">
            <router-link :to="`/vacancy/${slug}`"><button class="main-btn">See vacancy</button></router-link>
            <slot>
                
            </slot>
        </div>
    </div>

</template>

<style scoped>
    .card {
        background-color: #fffffffc;
        border: 1px solid #fff;
        display: flex;
        flex-direction: column;
        max-width: 400px;
    }

    section {
        flex: 1;
    }

    a {
        min-width: 120px;
        height: 30px;
        margin: 10px;
    }

    .buttons {
        margin-top: auto;
        display: flex;
        flex-direction: column;
    }
    .buttons a {
        width: 100%;
    }
    .main-btn {
        width: 94%;
        height: 30px;
    }
</style>