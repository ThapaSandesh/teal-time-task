import { APP } from "./../App/APP";

type HttpVerbType = "GET" | "POST" | "PUT" | "DELETE";

export function makeHttpReq<TInput, TResponse>(
    endpoint: string,
    verb: HttpVerbType,
    input?: TInput  //in case of blank input can be used for GET requests where no input is provided
) {
    return new Promise<TResponse>(async (resolve, reject) => {
        try {
            const res = await fetch(`${APP.apiBaseURL}/${endpoint}`,{
                method:verb,
                headers:{
                    "content-type": "application/json",
                },
                body: JSON.stringify(input)
            });
            const data:TResponse = await res.json();
            if(!res.ok){
                reject(data)
            }
            resolve(data)

        } catch (error) {
            reject(error);
        }
    });
}
