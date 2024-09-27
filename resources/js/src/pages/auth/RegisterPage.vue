<script lang="ts" setup>
import { registerInput, useRegisterUser } from "./actions/register";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Error from "../../components/Error.vue";

const rules = {
    email: { required, email }, // Matches state.firstName
    password: { required }, // Matches state.lastName
};

const v$ = useVuelidate(rules, registerInput);
// const { loading, register } = useRegisterUser();

async function submitRegister() {
    const result = await v$.value.$validate();
    if (!result) return;

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

                            <form @submit.prevent="submitRegister">
                                <div class="form-group">
                                        <Error label="E-mail":errors="v$.email.$errors">
                                        <input
                                            v-model="registerInput.email"
                                            type="email"
                                            autocomplete="off"
                                            class="form-control"
                                            placeholder=""
                                        />
                                    </Error>

                                </div>
                                <div class="form-group">
                                        <Error label="Password" :errors="v$.password.$errors">
                                            <input
                                            v-model="registerInput.password"
                                            type="password"
                                            autocomplete="off"
                                            class="form-control"
                                            placeholder=""
                                        />
                                        </Error>

                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary mt-3">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
