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
                                    <label for="">Email</label>
                                    <div
                                        :class="{
                                            error: v$.email.$errors.length,
                                        }"
                                    >
                                        <input
                                            v-model="registerInput.email"
                                            type="email"
                                            autocomplete="off"
                                            class="form-control"
                                            placeholder=""
                                        />
                                        <div
                                            class="input-errors"
                                            v-for="error of v$.email.$errors"
                                            :key="error.$uid"
                                        >
                                            <div class="error-msg">
                                                {{ error.$message }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Password</label>
                                    <div
                                        :class="{
                                            error: v$.password.$errors.length,
                                        }"
                                    >
                                        <input
                                            v-model="registerInput.password"
                                            type="password"
                                            autocomplete="off"
                                            class="form-control"
                                            placeholder=""
                                        />
                                        <div
                                            class="input-errors"
                                            v-for="error of v$.password.$errors"
                                            :key="error.$uid"
                                        >
                                            <div class="error-msg">
                                                {{ error.$message }}
                                            </div>
                                        </div>
                                    </div>
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
