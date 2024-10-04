<!-- ### Parent Component ### -->

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { MemberType, useGetMembers } from './actions/GetMember';
import MemberTable from './component/MemberTable.vue';
import { onMounted } from 'vue';
import { memberStore } from './store/memberStore';
import { MemberInputType } from './actions/CreateMember';
const{getMembers,memberData,loading} = useGetMembers();
async function showListOfMembers(){
    await getMembers();
}
const router = useRouter()
function editMember(member:MemberType){
    memberStore.memberInput = member;
    memberStore.edit = true;
    router.push('/create-members');
}
onMounted(async () => {
    showListOfMembers();
    memberStore.edit = false;
    memberStore.memberInput= {} as MemberInputType
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
                        @editMember ="editMember"
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
