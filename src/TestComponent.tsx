import React, { useEffect, useState } from 'react'
import { authHeader } from './Auth/auth-service/AuthService'

const TestComponent = () => {
    const [categories,setCategories] = useState([])
    const [loaded,setLoaded] = useState(false)
    const [error,setError] = useState(null)
    useEffect(() => {
        fetch(`https://localhost:44381/api/Category/?PageNumber=1&PageSize=50`,{
            method:'GET',
            headers:authHeader()
        }
        ).then(res => res.json()).then(res =>
            {
                setLoaded(true)
                setCategories(res)
            },(err) =>{
                setLoaded(true)
                setError(err)
            })
    }, [])
    if(error)
    {
        return <div>{error}</div>
    }
    else if(!loaded)
    {
        return <div>LOADING</div>
    }
    else{
  return (
    <div className='container'>
        <ul>
            {categories.map((e : any) =>
            
                <li>{e.name}</li>
            )}
        </ul>
    </div>
  )
}
}

export default TestComponent