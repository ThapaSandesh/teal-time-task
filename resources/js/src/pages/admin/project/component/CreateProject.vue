<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {
    projectStore,
    useCreateOrupdateProject,
} from "../actions/CreateProject";

const rules = {
    startDate: { required },
    name: { required },
    endDate: { required },
};

const v$ = useVuelidate(rules, projectStore.projectInput);
const { loading, createOrUpdate } = useCreateOrupdateProject();

async function submitProject() {
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
                <h1>
                    {{
                        projectStore.edit ? "Update Project" : "Create Project"
                    }}
                </h1>

                <form @submit.prevent="submitProject">
                    <div class="form-group">
                        <Error label="Name" :errors="v$.name.$errors">
                            <BaseInput
                                v-model="projectStore.projectInput.name"
                            />
                        </Error>
                    </div>
                    <div class="form-group">
                        <Error label="Start Date" :errors="v$.startDate.$errors">
                            <BaseInput
                                v-model="projectStore.projectInput.startDate"
                                type="date"
                            />
                        </Error>
                    </div>
                    <div class="form-group">
                        <Error label="End Date" :errors="v$.endDate.$errors">
                            <BaseInput
                                v-model="projectStore.projectInput.endDate"
                                type="date"
                            />
                        </Error>
                    </div>
                    <div class="mt-2">
                        <router-link to="/projects"
                            >see all projects</router-link
                        >
                    </div>
                    <div class="form-group mt-3">
                        <BaseBtn
                            :class="
                                projectStore.edit
                                    ? 'btn btn-warning'
                                    : 'btn btn-primary'
                            "
                            :label="
                                projectStore.edit
                                    ? 'Update Project'
                                    : 'Create Project'
                            "
                            :loading="loading"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
