<script lang="ts" setup>
import MemberTable from './component/MemberTable.vue';

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
                        <MemberTable />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>