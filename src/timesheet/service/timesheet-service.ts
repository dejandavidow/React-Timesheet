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