

import { defineStore } from "pinia";
import { ProjectInputType } from "../actions/CreateProject";


const useProjectStore = defineStore('member',{
    state: () => ({
        projectInput: {} as ProjectInputType,
        edit:false
    })
});

export const projectStore = useProjectStore();
