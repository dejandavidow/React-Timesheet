import { authHeader } from "../../Auth/auth-service/AuthService";
import { ChangePasswordModel } from "../model/ChangePasswordModel";
import { MemberModel } from "../model/MemberModel";

export const getAllMembers = async (
  searchterm: string,
  filterLetter: string,
  pagenumber: number,
  pagesize: number
): Promise<MemberModel[]> => {
  const response: MemberModel[] = [];
  if (searchterm === "" && filterLetter === "") {
    await fetch(
      `https://localhost:44381/api/Members?PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: MemberModel) => response.push(c)));
  } else if (searchterm !== "" && filterLetter === "") {
    await fetch(
      `https://localhost:44381/api/Members/search?PageNumber=${pagenumber}&PageSize=${pagesize}&search=${searchterm}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: MemberModel) => response.push(c)));
  } else if (searchterm === "" && filterLetter !== "") {
    await fetch(
      `https://localhost:44381/api/Members/filters?letter=${filterLetter}&PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: MemberModel) => response.push(c)));
  }
  return response;
};

export const PostMember = async (body: MemberModel): Promise<any> => {
  const request = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch("https://localhost:44381/api/Members", request).then(
    (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && response.json();
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && response.body) || response.status;
        return Promise.reject(error);
      }
    }
  );
};

export const deleteMember = async (id: string | undefined): Promise<any> => {
  const request = {
    method: "DELETE",
    headers: authHeader(),
  };
  await fetch(`https://localhost:44381/api/Members/${id}`, request).then(
    (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && response.json();
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && response.body) || response.status;
        return Promise.reject(error);
      }
    }
  );
};

export const UpdateMember = async (
  body: MemberModel,
  id: string | undefined
): Promise<any> => {
  const request = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch(`https://localhost:44381/api/Members/${id}`, request).then(
    (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && response.json();
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && response.body) || response.status;
        return Promise.reject(error);
      }
    }
  );
};

export const countMembers = async (searchterm: string, letter: string) => {
  const request = {
    method: "GET",
    headers: authHeader(),
  };

  if (searchterm !== "" && letter === "") {
    var response: number = await fetch(
      `https://localhost:44381/api/Members/search-count?search=${searchterm}`,
      request
    ).then((response) => response.json());
    return response;
  } else if (searchterm === "" && letter !== "") {
    var response: number = await fetch(
      `https://localhost:44381/api/Members/filter-count?letter=${letter}`,
      request
    ).then((response) => response.json());
    return response;
  } else {
    var response: number = await fetch(
      `https://localhost:44381/api/Members/search-count`,
      request
    ).then((response) => response.json());
    return response;
  }
};
export const getMembers = async (): Promise<MemberModel[]> => {
  const response: MemberModel[] = [];
  await fetch(`https://localhost:44381/api/Members/`, {
    method: "GET",
    headers: authHeader(),
  })
    .then((cl) => cl.json())
    .then((cl) => cl.map((c: MemberModel) => response.push(c)));
  return response;
};

export const changePasswordAsync = async (
  email: string | undefined,
  password: string
) => {
  await fetch("https://localhost:44381/api/Members/change-password", {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ email, password }),
  });
};
export const getMemberbyEmail = async (email: string): Promise<MemberModel> => {
  const res: MemberModel | any = await fetch(
    `https://localhost:44381/api/Members/email/${email}`,
    {
      method: "GET",
      headers: authHeader(),
    }
  ).then((res) => res.json());
  return res;
};
export const userChangePassword = async (body: ChangePasswordModel) => {
  var response = await fetch(
    "https://localhost:44381/api/Members/member/change-password",
    {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    return response.json();
  }
};
