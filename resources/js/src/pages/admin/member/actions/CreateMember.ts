import { ref } from "vue";
import { makeHttpReq } from "../../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../../helper/toast-notification";
import { ShowErrorResponse } from "../../../../helper/util";

export type MemberInputType = { //A typescript type that defines the structure of the data needed to register a user.in this case email and password
    name : string,
    email : string;
}

export type MemberResponseType = { //a typescript type that defines the structure of the response from the server after the registration attempt.
    message:string //a string message from the server
}

export const memberInput = ref<MemberInputType>({} as MemberInputType) //memberInput is a reactive variable that holds the registration input data i.e (email and password) entered by the user.

export function useCreateOrUpdateMember(){
    const loading = ref(false);
    async function createOrUpdate() //this is an aynchronous function that performs the registration logiv
    {
        try{
            loading.value = true; //when true the registration is in progress
            const data = await makeHttpReq<MemberInputType,MemberResponseType> //calls the makeHttpReq function to send a post request to the register endpoint passing the data from memberInput.value
            ('members','POST',memberInput.value)
            loading.value = false;
            memberInput.value={} as MemberInputType
            successMsg(data.message);
        }catch(error) //handles the error that occurs when processing
        {
            loading.value = false;
            ShowErrorResponse(error)
          
        }


    }
    return {createOrUpdate,loading}
}



