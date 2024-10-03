import { showError } from "./toast-notification";

export function ShowErrorResponse(error:unknown){
    if (Array.isArray(error)) {
        for(const message of error as string[]){
            showError(message);
        }
    }
    else{
        showError((error as Error).message);
    }
}

export function myDebounce<T>(func:()=> Promise<T>,delay:number) //the function is only called after a specified delay has passed
{
    let timer:any;
    return function(){
        clearTimeout(timer);
        setTimeout(() =>func(),delay);
    }
}

