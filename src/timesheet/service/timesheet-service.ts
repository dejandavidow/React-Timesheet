import { TsModel } from "../model/TsModel"

export const getTimeSheets = async () =>
{
    const response: TsModel[] = []
    await fetch(`https://localhost:44381/api/TimeSheet/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(cl => cl.json()).then(cl => cl.map((c: TsModel) => response.push(c)))
        return response;
}
export const PostTimeSheet = async(body:TsModel) =>
{
    const request =
    {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    };
    await fetch('https://localhost:44381/api/TimeSheet/',request)
    .then( response => response.json())
}