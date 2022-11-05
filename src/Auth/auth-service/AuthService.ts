import { LoginModel } from "../model/LoginModel";
export const Auth = async (body: LoginModel): Promise<any> => {
  await fetch("https://localhost:44381/api/Members/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.accessToken) {
        localStorage.setItem("user", JSON.stringify(response));
      } else {
        return Promise.reject(response.ErrorMessage);
      }
    });
};
export const authHeader = (): HeadersInit | undefined => {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);
  if (user && user.accessToken) {
    return {
      Authorization: "Bearer" + " " + user.accessToken,
      "Content-Type": "application/json",
    };
  } else {
    return { "Content-Type": "application/json" };
  }
};
export const logout = async () => {
  localStorage.removeItem("user");
};
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};
