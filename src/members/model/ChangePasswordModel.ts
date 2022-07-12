export class ChangePasswordModel
{
    constructor(public id:string,public oldPassword:string,public newPassword:string,public confirmPassword:string)
    {
        
    }
}