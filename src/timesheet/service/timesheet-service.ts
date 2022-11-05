import { authHeader } from "../../Auth/auth-service/AuthService";
import { ReportModel } from "../model/ReportModel";
import { TsModel } from "../model/TsModel";
export const getPageCount = async (
  startDate: string,
  endDate: string,
  categoryId: string,
  projectId: string,
  clientId: string,
  pageNumber: number,
  pageSize: number,
  memberId: string
): Promise<any> => {
  var response: number = await fetch(
    `https://localhost:44381/api/TimeSheets/filters-count?FilterStart=${startDate}&FilterEnd=${endDate}&ClientId=${clientId}&ProjectId=${projectId}&CategoryId=${categoryId}&MemberId=${memberId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      method: "GET",
      headers: authHeader(),
    }
  ).then((response) => response.json());
  return response;
};
export const getTimeSheets = async (
  start: string,
  end: string
): Promise<TsModel[]> => {
  const response: TsModel[] = [];
  await fetch(
    `https://localhost:44381/api/TimeSheets?Start=${start}&End=${end}`,
    {
      method: "GET",
      headers: authHeader(),
    }
  )
    .then((cl) => cl.json())
    .then((cl) => cl.map((c: TsModel) => response.push(c)));
  return response;
};
export const getFilteredTimeSheets = async (
  startDate: string,
  endDate: string,
  categoryId: string,
  projectId: string,
  clientId: string,
  pageNumber: number,
  pageSize: number,
  memberId: string
): Promise<ReportModel[]> => {
  const response: ReportModel[] = [];
  await fetch(
    `https://localhost:44381/api/TimeSheets/filters?FilterStart=${startDate}&FilterEnd=${endDate}&ClientId=${clientId}&ProjectId=${projectId}&CategoryId=${categoryId}&MemberId=${memberId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      method: "GET",
      headers: authHeader(),
    }
  )
    .then((cl) => cl.json())
    .then((cl) => cl.map((c: ReportModel) => response.push(c)));
  return response;
};
export const onLoadFilteredTimeSheets = async (
  startDate: string,
  endDate: string,
  categoryId: string,
  projectId: string,
  clientId: string,
  pageNumber: number,
  pageSize: number,
  memberId: string
): Promise<ReportModel[]> => {
  const response: ReportModel[] = [];
  await fetch(
    `https://localhost:44381/api/TimeSheets/filters?FilterStart=${startDate}&FilterEnd=${endDate}&ClientId=${clientId}&ProjectId=${projectId}&CategoryId=${categoryId}&MemberId=${memberId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      method: "GET",
      headers: authHeader(),
    }
  )
    .then((cl) => cl.json())
    .then((cl) => cl.map((c: ReportModel) => response.push(c)));
  return response;
};
export const PostTimeSheet = async (body: TsModel): Promise<any> => {
  const request = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  await fetch("https://localhost:44381/api/TimeSheets/", request).then(
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