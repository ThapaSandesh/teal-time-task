import { ref } from "vue"
import { makeHttpReq } from "../../../../helper/makeHttpReq"
import { ShowErrorResponse } from "../../../../helper/util"


export type ProjectType={
    id:number
    name:string
    startDate:string
    endDate:string
}

export type GetProjectType={
    data:{data:Array<ProjectType>}
} & Record<string, any>


export function useGetProjects(){
    const loading=ref(false)
    const projectData=ref<GetProjectType>({} as GetProjectType)
    async function getProjects(page:number=1,query:string=''){
       try {
        loading.value = true
        const data= await makeHttpReq<undefined,GetProjectType>
        (`projects?query=${query}&page=${page}`,'GET')
        loading.value = false
        projectData.value = data

       } catch (error) {
        loading.value = false
        ShowErrorResponse(error)
       }
    }

    return {getProjects,projectData,loading}
}
