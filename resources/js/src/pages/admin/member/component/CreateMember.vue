<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import Error from "../../../../components/Error.vue";
import BaseInput from "../../../../components/BaseInput.vue";
import BaseBtn from "../../../../components/BaseBtn.vue";


import { memberStore, useCreateOrUpdateMember } from "../actions/CreateMember";


const rules = {
    email: { required, email }, // Matches state.firstName
    name: { required }, // Matches state.lastName
};

const v$ = useVuelidate(rules, memberStore.memberInput);
const { loading, createOrUpdate } = useCreateOrUpdateMember();


async function submitMember() {
    const result = await v$.value.$validate();
    if (!result) return;
    await createOrUpdate();
    v$.value.$reset();
    // await register();
}
</script>

<template>
  <div class="container">
    <div class="row">
        <div class="col-md-6">
            <h1>{{memberStore.edit?'Update Member':'Create Member'}}</h1>

            <form @submit.prevent="submitMember">
                <div class="form-group">
                    <Error label="Name" :errors="v$.name.$errors">
                    <BaseInput v-model="memberStore.memberInput.name" />
                </Error>

            </div>
                <div class="form-group">
                    <Error label="E-mail" :errors="v$.email.$errors">
                    <BaseInput v-model="memberStore.memberInput.email" />
                </Error>

            </div>
            <div class="mt-2">
                <router-link to="/members">see all members</router-link>
            </div>
            <div class="form-group mt-3">
                <BaseBtn
                :class="memberStore.edit ? 'btn btn-warning':'btn btn-primary'"
                :label="memberStore.edit ? 'Update Member' : 'Create Member'"
                :loading="loading"/>
             </div>
            </form>
        </div>
    </div>
  </div>
</template>
