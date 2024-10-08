<!-- ### Parent Component ### -->

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { onMounted } from 'vue';
import { ProjectType, useGetProjects } from './actions/GetProject';
import { projectStore } from './store/projectStore';
import { ProjectInputType } from './actions/CreateProject';
import ProjectTable from './component/ProjectTable.vue';
const{getProjects,projectData,loading} = useGetProjects();
async function showListOfProjects(){
    await getProjects();
}
const router = useRouter()
function editProject(project:ProjectType){
    projectStore.projectInput = project;
    projectStore.edit = true;
    router.push('/create-projects');
}
onMounted(async () => {
    showListOfProjects();
    projectStore.edit = false;
    projectStore.projectInput= {} as ProjectInputType
});
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">
                        <router-link style="float: right;" to="/create-projects" class="btn btn-primary">Create Project</router-link>
                    </div>
                    <div class="card-body">
                        <!--   @getMember="getMembers"   it helps on getting the search data or the getMember event in child component occurs -->
                        <ProjectTable
                        @editProject ="editProject"
                        :loading="loading"
                        @getProject="getProjects"
                        :projects="projectData"
                        >
                        <template #pagination>
                                <Bootstrap5Pagination
                                v-if="projectData?.data"
                                :data="projectData?.data"
                                @pagination-change-page="getProjects"
                                />
                            </template>
                        </ProjectTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
