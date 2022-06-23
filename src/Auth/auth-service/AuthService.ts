
import { LoginModel } from "../model/LoginModel";
export const Auth = async (body:LoginModel) =>
{
    const request =
    {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(body)
    };
    await fetch('https://localhost:44381/api/Member/login',request)
  .then(response => response.json())
  .then((response) =>
  {
    if(response.accessToken)
    {
        localStorage.setItem('user',JSON.stringify(response))  
    }
    else
    {
        return alert(response.ErrorMessage)
    }
  })
}
export const authHeader = () : HeadersInit | undefined=> {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);
  if (user && user.accessToken) {
    return  {Authorization:'Bearer'+' '+user.accessToken,'Content-Type':'application/json'};
  } else {
    return {'Content-Type':'application/json'};
  }
}
  export const logout =() =>
  {
    localStorage.removeItem('user')
  }