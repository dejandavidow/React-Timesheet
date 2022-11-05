import { authHeader } from "../../Auth/auth-service/AuthService";
import { ProjectModel } from "../model/ProjectModel";
export const getProjects = async (
  searchterm: string,
  filterLetter: string,
  pagenumber: number,
  pagesize: number
): Promise<ProjectModel[]> => {
  const response: ProjectModel[] = [];
  if (searchterm === "" && filterLetter === "") {
    await fetch(
      `https://localhost:44381/api/Projects?PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: ProjectModel) => response.push(c)));
  } else if (searchterm !== "" && filterLetter === "") {
    await fetch(
      `https://localhost:44381/api/Projects/search?${searchterm}?PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: ProjectModel) => response.push(c)));
  } else if (searchterm === "" && filterLetter !== "") {
    await fetch(
      `https://localhost:44381/api/Projects/filters?letter=${filterLetter}&PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: ProjectModel) => response.push(c)));
  }
  return response;
};

export const PostProject = async (body: ProjectModel): Promise<any> => {
  const request = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch("https://localhost:44381/api/Projects", request).then(
    (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && response.json();
      if (!response.ok) {
        const error = (data && response.body) || response.status;
        return Promise.reject(error);
      }
    }
  );
};

export const deleteProject = async (id: string | undefined): Promise<any> => {
  const request = {
    method: "DELETE",
    headers: authHeader(),
  };
  await fetch(`https://localhost:44381/api/Projects/${id}`, request).then(
    (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && response.json();
      if (!response.ok) {
        const error = (data && response.body) || response.status;
        return Promise.reject(error);
      }
    }
  );
};

export const UpdateProject = async (
  body: ProjectModel,
  id: string | undefined
): Promise<any> => {
  const request = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch(`https://localhost:44381/api/Projects/${id}`, request).then(
    (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && response.json();
      if (!response.ok) {
        const error = (data && response.body) || response.status;
        return Promise.reject(error);
      }
    }
  );
};

export const countProjects = async (searchterm: string, letter: string) => {
  const request = {
    method: "GET",
    headers: authHeader(),
  };

  if (searchterm !== "" && letter === "") {
    var response: number = await fetch(
      `https://localhost:44381/api/Projects/search-count?search=${searchterm}`,
      request
    ).then((response) => response.json());
    return response;
  } else if (searchterm === "" && letter !== "") {
    var response: number = await fetch(
      `https://localhost:44381/api/Projects/filter-count?letter=${letter}`,
      request
    ).then((response) => response.json());
    return response;
  } else {
    var response: number = await fetch(
      `https://localhost:44381/api/Projects/search-count`,
      request
    ).then((response) => response.json());
    return response;
  }
};
export const getProjectList = async (): Promise<ProjectModel[]> => {
  const response: ProjectModel[] = [];
  await fetch(`https://localhost:44381/api/Projects/`, {
    method: "GET",
    headers: authHeader(),
  })
    .then((cl) => cl.json())
    .then((cl) => cl.map((c: ProjectModel) => response.push(c)));
  return response;
};
