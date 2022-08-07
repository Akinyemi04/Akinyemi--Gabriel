import { useEffect, useState } from "react"

const useFetch = (content)=>{
    const[val,setVal]=useState(null)
    const[error,setError]=useState(null)
    const[ispending,setIsPendding]=useState(true)
    useEffect(()=>{
        fetch('http://localhost:4000',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            query :content
             })
        })
        .then(res=>{
            if(!res.ok){
                throw Error('could not fetch data from resources')
            }
            return res.json()})
        .then(data=>{
            setIsPendding(false)
            setVal(data.data)
            setError(null)
        })
        .catch(err=>{
            setIsPendding(false)
            setError(err.message)
        })
    },[content])
    return[val,ispending,error]
}
export default useFetch