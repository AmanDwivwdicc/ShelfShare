import api from "./api";

export const authAPI = {
  signup: (data) => api.post("/auth/signup", data),
  login: (data) => api.post("/auth/login", data),
};

export const booksAPI = {
  getAll: () => api.get("/books"),
  getById: (id) => api.get(`/books/${id}`),
  create: (formData) =>
    api.post("/books", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export const requestsAPI = {
  create: (bookId) => api.post("/requests", { bookId }),
};
