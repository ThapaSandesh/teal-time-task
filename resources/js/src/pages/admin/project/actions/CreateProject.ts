import { ref } from "vue";
import { makeHttpReq } from "../../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../../helper/toast-notification";
import { ShowErrorResponse } from "../../../../helper/util";
import { projectStore } from "../store/projectStore";



export type ProjectInputType = { //A typescript type that defines the structure of the data needed to register a member.in this case email and name
    name : string,
    startDate : string;
    endDate : string;
}

export type ProjectResponseType = { //a typescript type that defines the structure of the response from the server after the registration attempt.
    message:string //a string message from the server
}

//memberInput is a reactive variable that holds the registration input data i.e (email and password) entered by the user.

export function useCreateOrupdateProject(){
  const loading = ref(false);
  async function createOrUpdate() //this is an aynchronous function that performs the registration logiv
  {
    try {
            loading.value = true; //when true the registration is in progress
            const data = projectStore.edit ?
            await updateProject():
            await createProject(); //if the condition is

            loading.value = false;
            projectStore.projectInput={} as ProjectInputType
            successMsg(data.message);
        }catch(error) //handles the error that occurs when processing
        {
            loading.value = false;
            ShowErrorResponse(error)

        }
    }
    return {createOrUpdate,loading}
}

async function createProject()
{
    const data = await makeHttpReq<ProjectInputType,ProjectResponseType> //calls the makeHttpReq function to send a post request to the register endpoint passing the data from memberInput.value
    ('projects','POST',projectStore.projectInput)
    return data
}
async function updateProject()
{
    const data = await makeHttpReq<ProjectInputType,ProjectResponseType> //calls the makeHttpReq function to send a post request to the register endpoint passing the data from projectInput.value
    ('projects','PUT',projectStore.projectInput)
    projectStore.edit = false
    return data
}

export { projectStore };

