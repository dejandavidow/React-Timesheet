import { MemberModel } from "../model/MemberModel"


export const getCategories = async(searchterm: string, filterLetter: string, pagenumber:number,pagesize:number): Promise<MemberModel[]> => {
    const response: MemberModel[] = []
    if(searchterm === '' && filterLetter === ''){
        await fetch(`https://localhost:44381/api/Member/?PageNumber=${pagenumber}&PageSize=${pagesize}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(cl => cl.json()).then(cl => cl.map((c: MemberModel) => response.push(c)))
    }
    else if(searchterm !== '' && filterLetter === ''){
        await fetch(`https://localhost:44381/api/Member/search?${searchterm}?PageNumber=${pagenumber}&PageSize=${pagesize}&search=${searchterm}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(cl => cl.json()).then(cl => cl.map((c: MemberModel) => response.push(c)))
    }
    else if(searchterm === '' && filterLetter !== ''){
        await fetch(`https://localhost:44381/api/Member/filter?letter=${filterLetter}&PageNumber=${pagenumber}&PageSize=${pagesize}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        }).then(cl => cl.json()).then(cl => cl.map((c: MemberModel) => response.push(c)))
    }
    return response;
}

export const PostCategory = async(body:MemberModel) =>
{
    const request =
    {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    };
    await fetch('https://localhost:44381/api/Member',request)
    .then( response => response.json())
}

export const deleteCategory = async (id:string | undefined) =>
{
    const request = 
    {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
      const response = await fetch(`https://localhost:44381/api/Member/${id}`,request)
      .then(response => response.json())
      return response;
}

export const UpdateCategory = async(body:MemberModel,id:string | undefined) =>
{
    const request =
    {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    };
    await fetch(`https://localhost:44381/api/Member/${id}`,request)
    .then( response => response.json())
}

export const countCategory = async(searchterm:string, letter:string) =>
{
    const request =
    {
        method:'GET',
        headers: {'Content-Type': 'application/json'}
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
            headers: {'Content-Type': 'application/json'}
        }).then(cl => cl.json()).then(cl => cl.map((c: MemberModel) => response.push(c)))
        return response;
}  




