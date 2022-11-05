export class ProjectModel
{
    constructor(public id:string | undefined,public projectName:string,public description:string,public status:string,public archive:string,public memberId:string,public clientId:string)
    {

    }
}