import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";
import { ShowErrorResponse } from "../../../helper/util";

export type LoginUserType = { //A typescript type that defines the structure of the data needed to register a user.in this case email and password
    email : string;
    password : string;
}
export type LoginResponseType = { //a typescript type that defines the structure of the response from the server after the registration attempt.
    user:{email:string,id:string}, //an object containing the user's email
    message:string //a string message from the server
    isLoggedIn:boolean
    token:string
}
export const loginInput = ref<LoginUserType>({} as LoginUserType) //loginInput is a reactive variable that holds the registration input data i.e (email and password) entered by the user.

export function useLoginUser(){
    const loading = ref(false);
    async function login() //this is an aynchronous function that performs the registration logiv
    {
        try{
            loading.value = true; //when true the registration is in progress
            const data = await makeHttpReq<LoginUserType,LoginResponseType> //calls the makeHttpReq function to send a post request to the login endpoint passing the data from loginInput.value
            ('login','POST',loginInput.value)
            loading.value = false;
            loginInput.value={} as LoginUserType
            successMsg(data.message);

            if (data.isLoggedIn) {
                localStorage.setItem('userData',JSON.stringify(data))
                window.location.href="/app/admin"
            }
        }catch(error) //handles the error that occurs when processing
        {
            loading.value = false;
            ShowErrorResponse(error);

        }
    }
    return {login,loading}
}



