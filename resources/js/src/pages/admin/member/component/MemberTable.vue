<script lang="ts" setup>
import { GetMemberType } from '../actions/GetMember';

defineProps<{
    members:GetMemberType
}>()
</script>


<template>
   <table class="table table-bordered table-hover">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
         <tr v-for="member in members?.data?.data" :key="member.id">
            <td>{{ member.id }}</td>
            <td>{{ member.name }}</td>
            <td>{{ member.email }}</td>
        </tr>
   </table>
</template>
