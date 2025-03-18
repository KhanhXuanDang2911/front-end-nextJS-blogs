// import { ApiResponse } from "../_interface/api";

const API_SERVER = "http://localhost:8000/api/";

export const get = async <T>(path: string): Promise<T> => {
  console.log(`${API_SERVER}${path}`);
  const response = await fetch(`${API_SERVER}${path}`);
  return response.json();
};

export const post = async <T>(path: string, data: any): Promise<T> => {
  console.log(data)
  const res = await fetch(`${API_SERVER}${path}`, { 
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`POST ${path} failed: ${res.statusText}`);
  }

  return res.json();
};

export const put = async <T>(path: string, data: any): Promise<T> => {
  const res = await fetch(`${API_SERVER}${path}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`PUT ${path} failed: ${res.statusText}`);
  }

  return res.json();
};

export const patch = async <T>(path: string, data: any): Promise<T> => {
  const res:any = await fetch(`${API_SERVER}${path}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`PATCH ${path} failed: ${res.statusText}`);
  }

  return res;
};

export const del = async <T>(path: string): Promise<T> => {
  const res:any = await fetch(`${API_SERVER}${path}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`DELETE ${path} failed: ${res.statusText}`);
  }
    return res
};
