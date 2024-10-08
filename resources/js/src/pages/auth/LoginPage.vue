<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { loginInput, useLoginUser } from "./actions/login";


const rules = {
    email: { required, email }, // Matches state.firstName
    password: { required }, // Matches state.lastName
};

const v$ = useVuelidate(rules, loginInput);
const { loading, login } = useLoginUser();


async function submitLogin() {
    const result = await v$.value.$validate();
    if (!result) return;
    await login();
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
                            <h2 align="center">Login</h2>
                            <br />
                            <br />
                            <!-- {{ loginInput }} -->
                            <form @submit.prevent="submitLogin">

                                <div class="form-group">
                                        <Error label="E-mail" :errors="v$.email.$errors">

                                        <BaseInput v-model="loginInput.email" />
                                    </Error>

                                </div>
                                <div class="form-group">
                                        <Error label="Password" :errors="v$.password.$errors">

                                        <BaseInput
                                        type="password"
                                        v-model="loginInput.password" />
                                        </Error>

                                </div>
                                <div class="form-group">
                                    <router-link to="/register">create an account</router-link>
                                </div>
                                <div class="form-group mt-3">
                                   <BaseBtn label="Login" :loading="loading"/>
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
