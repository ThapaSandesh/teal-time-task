<!-- ### Parent Component ### -->

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
                        <!--   @getMember="getMembers"   it helps on getting the search data or the getMember event in child component occurs -->
                        <MemberTable
                        :loading="loading"
                        @getMember="getMembers"
                        :members="memberData"
                        >
                        <template #pagination>
                                <Bootstrap5Pagination
                                v-if="memberData?.data"
                                :data="memberData?.data"
                                @pagination-change-page="getMembers"
                                />

                            </template>
                        </MemberTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
