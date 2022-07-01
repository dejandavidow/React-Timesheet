
import { type } from "os"
import { authHeader } from "../../Auth/auth-service/AuthService"
import { MemberModel } from "../model/MemberModel"
import { PasswordResetModel } from "../model/PasswordResetModel"

export const getCategories = async(searchterm: string, filterLetter: string, pagenumber:number,pagesize:number): Promise<MemberModel[]> => {
    const response: MemberModel[] = []
    if(searchterm === '' && filterLetter === ''){
        await fetch(`https://localhost:44381/api/Member/?PageNumber=${pagenumber}&PageSize=${pagesize}`, {
            method: 'GET',
            headers: authHeader()
        }).then(cl => cl.json()).then(cl => cl.map((c: MemberModel) => response.push(c)))
    }
    else if(searchterm !== '' && filterLetter === ''){
        await fetch(`https://localhost:44381/api/Member/search?${searchterm}?PageNumber=${pagenumber}&PageSize=${pagesize}&search=${searchterm}`, {
        method: 'GET',
        headers: authHeader()
    }).then(cl => cl.json()).then(cl => cl.map((c: MemberModel) => response.push(c)))
    }
    else if(searchterm === '' && filterLetter !== ''){
        await fetch(`https://localhost:44381/api/Member/filter?letter=${filterLetter}&PageNumber=${pagenumber}&PageSize=${pagesize}`, {
        method: 'GET',
        headers: authHeader()
        }).then(cl => cl.json()).then(cl => cl.map((c: MemberModel) => response.push(c)))
    }
    return response;
}

export const PostCategory = async(body:MemberModel) : Promise<any>=>
{
    const request =
    {
        method:'POST',
        headers: authHeader(),
        body:JSON.stringify(body)
    };
    await fetch('https://localhost:44381/api/Member',request)
    .then(response =>{
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson &&  response.json();
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && response.body) || response.status;
            return Promise.reject(error);
        }
    })
}

export const deleteCategory = async (id:string | undefined) : Promise<any>=>
{
    const request = 
    {
        method: 'DELETE',
        headers: authHeader()
    }
      await fetch(`https://localhost:44381/api/Member/${id}`,request)
      .then(response =>{
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson &&  response.json();
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && response.body) || response.status;
            return Promise.reject(error);
        }
    })
}

export const UpdateCategory = async(body:MemberModel,id:string | undefined): Promise<any> =>
{
    const request =
    {
        method:'PUT',
        headers: authHeader(),
        body:JSON.stringify(body)
    };
    await fetch(`https://localhost:44381/api/Member/${id}`,request)
    .then(response =>{
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson &&  response.json();
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && response.body) || response.status;
            return Promise.reject(error);
        }
    })
}

export const countCategory = async(searchterm:string, letter:string) =>
{
    const request =
    {
        method:'GET',
        headers: authHeader()
    };


    if(searchterm !== '' && letter === '')
    {
    var response :number = await fetch(`https://localhost:44381/api/Member/search-count?search=${searchterm}`,request)
    .then(response => response.json())     
    return response;
    }

    else if(searchterm === '' && letter !== '')
    {
        var response :number = await fetch(`https://localhost:44381/api/Member/filter-count?letter=${letter}`,request)
        .then(response => response.json())     
        return response;
    }
    else
    {
    var response :number = await fetch(`https://localhost:44381/api/Member/search-count?search=${searchterm}`,request)
    .then(response => response.json())     
    return response;
    }
}
export const getMembers = async(): Promise<MemberModel[]> =>
{
    const response: MemberModel[] = []
        await fetch(`https://localhost:44381/api/Member/`, {
            method: 'GET',
            headers: authHeader()
        }).then(cl => cl.json()).then(cl => cl.map((c: MemberModel) => response.push(c)))
        return response;
} 

export const changePasswordAsync =  async(email:string | undefined,password:string) =>
{
    await fetch('https://localhost:44381/api/Member/change-password',
    {
        method:'PUT',
        headers:authHeader(),
        body:JSON.stringify({email,password})
    }
    )
}
export const getMemberbyEmail =  async (email:string) : Promise<MemberModel>=>
{
     const response : MemberModel= await fetch(`https://localhost:44381/api/Member/email/${email}`,
    {
        method:'GET',
        headers:authHeader(),
    }
    ).then(res => res.json())
        return response;
}