<script lang="ts" setup>
import { registerInput, useRegisterUser } from "./actions/register";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Error from "../../components/Error.vue";
import BaseInput from "../../components/BaseInput.vue";
import BaseBtn from "../../components/BaseBtn.vue";


const rules = {
    email: { required, email }, // Matches state.firstName
    password: { required }, // Matches state.lastName
};

const v$ = useVuelidate(rules, registerInput);
const { loading, register } = useRegisterUser();


async function submitRegister() {
    const result = await v$.value.$validate();
    if (!result) return;
    await register();
    v$.value.$reset();
    // await register();
}
</script>

<template>
    <div class="container registerForm">
        <div class="row">
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h2 align="center">Register</h2>
                            <br />
                            <br />
                            <!-- {{ registerInput }} -->
                            <form @submit.prevent="submitRegister">
                               
                                <div class="form-group">
                                        <Error label="E-mail" :errors="v$.email.$errors">
                                        
                                        <BaseInput v-model="registerInput.email" />
                                    </Error>

                                </div>
                                <div class="form-group">
                                        <Error label="Password" :errors="v$.password.$errors">
                                           
                                        <BaseInput
                                        type="password"
                                        v-model="registerInput.password" />
                                        </Error>

                                </div>
                                <div class="form-group">
                                    <router-link to="/login">Login to you account</router-link>
                                </div>
                                <div class="form-group mt-3">
                                   <BaseBtn label="Register" :loading="loading"/>
                                </div>
                                <!-- <div class="form-group">
                                    <button class="btn btn-primary mt-3">
                                        Register
                                    </button>
                                </div> -->
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
