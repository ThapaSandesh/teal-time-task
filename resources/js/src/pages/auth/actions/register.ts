import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";

export type RegisterUserType = { //A typescript type that defines the structure of the data needed to register a user.in this case email and password
    email : string;
    password : string;
}

export type RegisterResponseType = { //a typescript type that defines the structure of the response from the server after the registration attempt.
    user:{email:string}, //an object containing the user's email
    message:string //a string message from the server
}

export const registerInput = ref<RegisterUserType>({} as RegisterUserType) //registerInput is a reactive variable that holds the registration input data i.e (email and password) entered by the user.

export function useRegisterUser(){
    const loading = ref(false);
    async function register() //this is an aynchronous function that performs the registration logiv
    {
        try{
            loading.value = true; //when true the registration is in progress
            const data = await makeHttpReq<RegisterUserType,RegisterResponseType> //calls the makeHttpReq function to send a post request to the register endpoint passing the data from registerInput.value
            ('register','POST',registerInput.value)
            loading.value = false;
            successMsg(data.message);
        }catch(error) //handles the error that occurs when processing
        {
           showError((error as Error).message);
        }


    }
}



