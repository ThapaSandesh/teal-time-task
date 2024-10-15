<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ApexDonut from './component/ApexDonut.vue';
import ApexRadialBar from './component/ApexRadialBar.vue';
import { useGetPinnedProject } from './actions/GetPinnedProject';
import { useGetTotalProject } from './actions/CountProject';

const {project,getPinnedProject} = useGetPinnedProject()
const {getTotalProject,countProject} = useGetTotalProject()

    onMounted(async() => {
        await getPinnedProject()
        console.log('...')
        getTotalProject()
    })
</script>

<template>
    <div class="row">
        <h2>Dashbaord</h2>
        <br />
        <br />
        <br />
        <div class="row">
            <div class="col-md-8">

                <h3 style="color: rgb(118, 119, 120)">
                    Project :{{ project?.name }}
                </h3>
            </div>
        </div>
        <br /><br />
        <div class="row">
            <div class="col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <b>Total Projects</b>
                    </div>
                    <div class="card-body">
                        <br />
                        <br />

                        <h2 align="center">{{ countProject?.count }}</h2>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-header"><b>Tasks</b></div>
                    <div class="card-body">
                        <ApexDonut :task="[60,40]" />
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <b>Task Progress</b>
                    </div>

                    <div class="card-body">
                        <ApexRadialBar :percent="70"/>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
