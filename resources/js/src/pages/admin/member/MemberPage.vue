<script lang="ts" setup>
import { useGetMembers } from './actions/GetMember';
import MemberTable from './component/MemberTable.vue';
import { onMounted } from 'vue';

const{getMembers,memberData,loading} = useGetMembers();
async function showListOfMembers(){
    await getMembers();
}
onMounted(async () => {
    showListOfMembers();
});


</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">
                        <router-link style="float: right;" to="/create-members" class="btn btn-primary">Create Member</router-link>
                    </div>
                    <div class="card-body">
                        <MemberTable :members="memberData"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
