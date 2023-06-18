import React, { useCallback, useState } from "react";

const useHook = ()=>{
    const[isLoading,setIsLoading] = useState(false)
    const sendRequest = useCallback(async(requestConfig,applyData=null)=>{
        setIsLoading(true)
        try{
            console.log(requestConfig.url,'custom url')
            const response = await fetch(requestConfig.url,{
                method : requestConfig.method ? requestConfig.method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            })
            if(!response.ok){
                throw new Error ('Request Faild')
            }
            const data = await response.json()
            console.log(data)
            if(applyData){
                applyData(data);
            }
           
        }
        catch(error){
            alert(error.message)
        }
        setIsLoading(false);
    },[])

    return{

        sendRequest,
        isLoading,
    }
}
export default useHook;