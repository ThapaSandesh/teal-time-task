import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";
import { ShowErrorResponse } from "../../../helper/util";

export function useLogoutUser(){
    const loading = ref(false);
    async function logout(userId:number) //this is an aynchronous function that performs the registration logiv
    {
        try{
            loading.value = true; //when true the registration is in progress
            const data = await makeHttpReq<{userId:number},{message:string}> //calls the makeHttpReq function to send a post request to the login endpoint passing the data from loginInput.value
            ('logout','POST',{userId:userId})
            loading.value = false;

            successMsg(data.message);

        }catch(error) //handles the error that occurs when processing
        {
            loading.value = false;
            ShowErrorResponse(error);

        }
    }
    return {logout,loading}
}



