<script lang="ts" setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const count = ref<number>(0)
</script>
<template>
    <div class="container">
        <h1>Hello world from vue 3</h1>
        {{ count }}
    </div>

    <button type="button" @click="count++">button</button>

</template>
