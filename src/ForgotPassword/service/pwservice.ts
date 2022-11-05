import { ForgotModel } from "../models/forgotmodel";
import { ResetModel } from "../models/resetmodel";

export const forgotpassword = async (body: ForgotModel): Promise<any> => {
  var response = await fetch(
    "https://localhost:44381/api/Members/forgot-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    return response.json();
  }
};
export const resetpassword = async (body: ResetModel, token: string | null) => {
  var response = await fetch(
    `https://localhost:44381/api/Members/reset-password?token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    return response.json();
  }
};
