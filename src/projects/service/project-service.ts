import { authHeader } from "../../Auth/auth-service/AuthService"
import { ProjectModel } from "../model/ProjectModel"
export const getCategories = async(searchterm: string, filterLetter: string, pagenumber:number,pagesize:number): Promise<ProjectModel[]> => {
    const response: ProjectModel[] = []
    if(searchterm === '' && filterLetter === ''){
        await fetch(`https://localhost:44381/api/Project/?PageNumber=${pagenumber}&PageSize=${pagesize}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        }).then(cl => cl.json()).then(cl => cl.map((c: ProjectModel) => response.push(c)))
    }
    else if(searchterm !== '' && filterLetter === ''){
        await fetch(`https://localhost:44381/api/Project/search?${searchterm}?PageNumber=${pagenumber}&PageSize=${pagesize}&search=${searchterm}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',}
    }).then(cl => cl.json()).then(cl => cl.map((c: ProjectModel) => response.push(c)))
    }
    else if(searchterm === '' && filterLetter !== ''){
        await fetch(`https://localhost:44381/api/Project/filter?letter=${filterLetter}&PageNumber=${pagenumber}&PageSize=${pagesize}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',}
        }).then(cl => cl.json()).then(cl => cl.map((c: ProjectModel) => response.push(c)))
    }
    return response;
}

export const PostCategory = async(body:ProjectModel) : Promise<any> =>
{
    const request =
    {
        method:'POST',
        headers: {'Content-Type': 'application/json',},
        body:JSON.stringify(body)
    };
    await fetch('https://localhost:44381/api/Project',request)
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
        headers: {'Content-Type': 'application/json',}
    }
      await fetch(`https://localhost:44381/api/Project/${id}`,request)
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

export const UpdateCategory = async(body:ProjectModel,id:string | undefined): Promise<any> =>
{
    const request =
    {
        method:'PUT',
        headers: {'Content-Type': 'application/json',},
        body:JSON.stringify(body)
    };
    await fetch(`https://localhost:44381/api/Project/${id}`,request)
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
        headers: {'Content-Type': 'application/json',}
    };


    if(searchterm !== '' && letter === '')
    {
    var response :number = await fetch(`https://localhost:44381/api/Project/search-count?search=${searchterm}`,request)
    .then(response => response.json())     
    return response;
    }

    else if(searchterm === '' && letter !== '')
    {
        var response :number = await fetch(`https://localhost:44381/api/Project/filter-count?letter=${letter}`,request)
        .then(response => response.json())     
        return response;
    }
    else
    {
    var response :number = await fetch(`https://localhost:44381/api/Project/search-count?search=${searchterm}`,request)
    .then(response => response.json())     
    return response;
    }
}
export const getProjectList = async(): Promise<ProjectModel[]> =>
{
    const response: ProjectModel[] = []
        await fetch(`https://localhost:44381/api/Project/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',},
        }).then(cl => cl.json()).then(cl => cl.map((c: ProjectModel) => response.push(c)))
        return response;
} 



