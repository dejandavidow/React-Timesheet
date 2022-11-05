import { ok } from "assert";
import { DeleteExpression, JsonObjectExpression } from "typescript";
import { authHeader } from "../../Auth/auth-service/AuthService";
import { ClientModel } from "../model/clientModel";

export const getClients = async (
  searchterm: string,
  filterLetter: string,
  pagenumber: number,
  pagesize: number
): Promise<ClientModel[]> => {
  const response: ClientModel[] = [];
  if (searchterm === "" && filterLetter === "") {
    await fetch(
      `https://localhost:44381/api/Clients?PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: ClientModel) => response.push(c)));
  } else if (searchterm !== "" && filterLetter === "") {
    await fetch(
      `https://localhost:44381/api/Clients/search/${searchterm}?PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: ClientModel) => response.push(c)));
  } else if (searchterm === "" && filterLetter !== "") {
    await fetch(
      `https://localhost:44381/api/Clients/filters?letter=${filterLetter}&PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: ClientModel) => response.push(c)));
  }
  return response;
};

export const PostClient = async (body: ClientModel): Promise<any> => {
  const request = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch("https://localhost:44381/api/Clients", request).then(
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

export const deleteClient = async (id: string | undefined): Promise<any> => {
  const request = {
    method: "DELETE",
    headers: authHeader(),
  };
  await fetch(`https://localhost:44381/api/Clients/${id}`, request).then(
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

export const UpdateClient = async (
  body: ClientModel,
  id: string | undefined
): Promise<any> => {
  const request = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch(`https://localhost:44381/api/Clients/${id}`, request).then(
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

export const countClients = async (searchterm: string, letter: string) => {
  const request = {
    method: "GET",
    headers: authHeader(),
  };

  if (searchterm !== "" && letter === "") {
    var response: number = await fetch(
      `https://localhost:44381/api/Clients/search-count?search=${searchterm}`,
      request
    ).then((response) => response.json());
    return response;
  } else if (searchterm === "" && letter !== "") {
    var response: number = await fetch(
      `https://localhost:44381/api/Clients/filter-count?letter=${letter}`,
      request
    ).then((response) => response.json());
    return response;
  } else {
    var response: number = await fetch(
      `https://localhost:44381/api/Clients/search-count`,
      request
    ).then((response) => response.json());
    return response;
  }
};
export const getClientList = async (): Promise<ClientModel[]> => {
  const response: ClientModel[] = [];
  await fetch(`https://localhost:44381/api/Clients/`, {
    method: "GET",
    headers: authHeader(),
  })
    .then((cl) => cl.json())
    .then((cl) => cl.map((c: ClientModel) => response.push(c)));
  return response;
};
