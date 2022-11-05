import { authHeader } from "../../Auth/auth-service/AuthService";
import { CategoryModel } from "../model/CategoryModel";
export const getCategories = async (
  searchterm: string,
  filterLetter: string,
  pagenumber: number,
  pagesize: number
): Promise<CategoryModel[]> => {
  const response: CategoryModel[] = [];

  if (searchterm === "" && filterLetter === "") {
    await fetch(
      `https://localhost:44381/api/Categories?PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((res) => {
        res.map((c: CategoryModel) => response.push(c));
      });
  } else if (searchterm !== "" && filterLetter === "") {
    await fetch(
      `https://localhost:44381/api/Categories/search?PageNumber=${pagenumber}&PageSize=${pagesize}&search=${searchterm}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: CategoryModel) => response.push(c)));
  } else if (searchterm === "" && filterLetter !== "") {
    await fetch(
      `https://localhost:44381/api/Categories/filters?letter=${filterLetter}&PageNumber=${pagenumber}&PageSize=${pagesize}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    )
      .then((cl) => cl.json())
      .then((cl) => cl.map((c: CategoryModel) => response.push(c)));
  }
  return response;
};

export const PostCategory = async (body: CategoryModel): Promise<any> => {
  const request = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch("https://localhost:44381/api/Categories", request).then(
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

export const deleteCategory = async (id: string | undefined): Promise<any> => {
  const request = {
    method: "DELETE",
    headers: authHeader(),
  };
  await fetch(`https://localhost:44381/api/Categories/${id}`, request).then(
    (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && response.json();
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && response.body) || response.status;
        console.log(error);

        return Promise.reject(error);
      }
    }
  );
};

export const UpdateCategory = async (
  body: CategoryModel,
  id: string | undefined
): Promise<any> => {
  const request = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch(`https://localhost:44381/api/Categories/${id}`, request).then(
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

export const countCategory = async (
  searchterm: string,
  letter: string
): Promise<number> => {
  const request = {
    method: "GET",
    headers: authHeader(),
  };

  if (searchterm !== "" && letter === "") {
    var res = await fetch(
      `https://localhost:44381/api/Categories/search-count?search=${searchterm}`,
      request
    ).then(
      (response) => response.json(),
      (err) => console.log(err)
    );
  } else if (searchterm === "" && letter !== "") {
    var res = await fetch(
      `https://localhost:44381/api/Categories/filter-count?letter=${letter}`,
      request
    ).then((response) => response.json());
  } else {
    var res = await fetch(
      `https://localhost:44381/api/Categories/search-count`,
      request
    ).then((response) => response.json());
  }
  return res;
};
export const getCategoriesList = async (): Promise<CategoryModel[]> => {
  const response: CategoryModel[] = [];
  await fetch(`https://localhost:44381/api/Categories/`, {
    method: "GET",
    headers: authHeader(),
  })
    .then((cl) => cl.json())
    .then((cl) => cl.map((c: CategoryModel) => response.push(c)));
  return response;
};
