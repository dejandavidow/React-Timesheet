import Category from "../../categories/components/Category";
import { CategoryModel } from "../../categories/model/CategoryModel";
import { ClientModel } from "../../clients/model/clientModel";
import { MemberModel } from "../../members/model/MemberModel";
import { ProjectModel } from "../../projects/model/ProjectModel";

export class ReportModel
{
    constructor(public id:string | undefined,public description:string,public time:string,
        public overTime:string,public date:string,public categoryDTO:CategoryModel,public projectDTO:ProjectDTO,
        )
    {

    }
}

export class ProjectDTO
{
    constructor(public id:string | undefined,public projectName:string,public description:string,public status:string,public archive:string,public memberDTO:MemberModel,public clientDTO:ClientModel)
    {

    }
}