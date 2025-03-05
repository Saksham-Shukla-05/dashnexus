import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5513",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const login = async (data: { email: string; password: string }) => {
  return api.post("/api/users/login", data);
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/api/users/register", data);
};

export const getBooks = async (page: number, limit: number) => {
  const response = await api.get("/api/books", {
    params: {
      page,
      limit,
    },
  });

  return response;
};

export const createBook = async (data: FormData) => {
  const response = await api.post("/api/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const editBook = async (bookId: string, data: FormData) => {
  const response = await api.patch(`/api/books/${bookId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getSingleBook = async (bookId: string) => {
  const response = await api.get(`/api/books/${bookId}`);
  return response.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await api.delete(`/api/books/${bookId}`);
  return response.data;
};
