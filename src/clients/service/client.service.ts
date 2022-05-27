import { ClientModel } from "../model/clientModel";

export const getClients = async(searchterm: string, filterLetter: string, pagenumber:number,pagesize:number): Promise<ClientModel[]> => {
    const response: ClientModel[] = []
    if(searchterm === '' && filterLetter === ''){
        await fetch(`https://localhost:5001/api/Client/?PageNumber=${pagenumber}&PageSize=${pagesize}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(cl => cl.json()).then(cl => cl.map((c: ClientModel) => response.push(c)))
    }
    else if(searchterm !== '' && filterLetter === ''){
        await fetch(`https://localhost:5001/api/Client/search/${searchterm}?PageNumber=${pagenumber}&PageSize=${pagesize}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(cl => cl.json()).then(cl => cl.map((c: ClientModel) => response.push(c)))
    }
    else if(searchterm === '' && filterLetter !== ''){
        await fetch(`https://localhost:5001/api/Client/filter?letter=${filterLetter}&PageNumber=${pagenumber}&PageSize=${pagesize}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        }).then(cl => cl.json()).then(cl => cl.map((c: ClientModel) => response.push(c)))
    }
    return response;
}

export const PostClient = async(body:ClientModel) =>
{
    const request =
    {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    };
    await fetch('https://localhost:5001/api/Client',request)
    .then( response => response.json())
}

export const deleteClient = async (id:string | undefined) =>
{
    const request = 
    {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
      const response = await fetch(`https://localhost:5001/api/Client/${id}`,request)
      .then(response => response.json())
      return response;
}

export const UpdateClient = async(body:ClientModel,id:string | undefined) =>
{
    const request =
    {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    };
    await fetch(`https://localhost:5001/api/Client/${id}`,request)
    .then( response => response.json())
}

export const countClients = async(searchterm:string, letter:string) =>
{
    const request =
    {
        method:'GET',
        headers: {'Content-Type': 'application/json'}
    };


    if(searchterm !== '' && letter === '')
    {
    var response :number = await fetch(`https://localhost:5001/api/Client/count/?search=${searchterm}`,request)
    .then(response => response.json())     
    return response;
    }

    else if(searchterm === '' && letter !== '')
    {
        var response :number = await fetch(`https://localhost:5001/api/Client/filter/count?letter=${letter}`,request)
        .then(response => response.json())     
        return response;
    }
    else
    {
    var response :number = await fetch(`https://localhost:5001/api/Client/count/?search=${searchterm}`,request)
    .then(response => response.json())     
    return response;
    }
}
// export const filterClients = async (letter:string,pagenumber:number,pagesize:number) =>
// {
//     const response: ClientModel[] = []
//     const request =
//     {
//         method:'GET',
//         headers: {'Content-Type': 'application/json'}
//     };


//     await fetch(`https://localhost:5001/api/Client/filter?letter=${letter}&PageNumber=${pagenumber}&PageSize=${pagesize}`,request)
//     .then(response => response.json()).then(cl => cl.map((c: ClientModel) => response.push(c)))     
//     return response; 
// }
// export const countFilterClients = async (letter:string) =>
// {
//     const request =
//     {
//         method:'GET',
//         headers: {'Content-Type': 'application/json'}
//     };
//     var response :number = await fetch(`https://localhost:5001/api/Client/filter/count?letter=${letter}`,request)
//     .then(response => response.json())     
//     return response;
// }



