

import { defineStore } from "pinia";
import { MemberInputType } from "../actions/CreateMember";

const useMemberStore = defineStore('member',{
    state: () => ({
        memberInput: {} as MemberInputType,
        edit:false
    })
});

export const memberStore = useMemberStore();
