<script lang="ts" setup>
import { ErrorObject } from "@vuelidate/core";

const props = defineProps<{
    errors: ErrorObject[];
}>();
</script>

<template>
    <label for="">E-mail</label>

    <div :class="{ error: props.errors.length }">

        <div
            class="input-errors"
            v-for="error of props.errors"
            :key="error.$uid"
        >
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>
</template>
<style>
    .input-errors {
        color: red;
    }
</style>
