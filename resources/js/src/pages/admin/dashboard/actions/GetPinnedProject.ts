import { ref } from "vue"
import { makeHttpReq } from "../../../../helper/makeHttpReq"
import { ShowErrorResponse } from "../../../../helper/util"


type pinnedProject={id:number,name:string}
export type PinnedProjectType={data:pinnedProject}
export function useGetPinnedProject(){
    const project=ref<pinnedProject>({} as pinnedProject)
    async function getPinnedProject(){
       try {
        // loading.value = true
        const {data}= await makeHttpReq<undefined, PinnedProjectType>
        (`pinned/projects`,'GET')
        project.value = data
        // loading.value = false
        // projectData.value = data

       } catch (error) {
        ShowErrorResponse(error)
       }
    }

    return {getPinnedProject,project}
}
