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