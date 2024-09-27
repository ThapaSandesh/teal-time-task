import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";

export type RegisterUserType = {
    email : string;
    password : string;
}

export type RegisterResponseType = {
    user:{email:string},
    message:string
}

export const registerInput = ref<RegisterUserType>({} as RegisterUserType)

export function useRegisterUser(){
    const loading = ref(false);
    async function register()
    {
        try{
            loading.value = true;
            const data = await makeHttpReq<RegisterUserType,RegisterResponseType>
            ('register','POST',registerInput.value)
            loading.value = false;
            console.log(data.message);
        }catch(error)
        {
           console.log(error);
        }


    }
}



