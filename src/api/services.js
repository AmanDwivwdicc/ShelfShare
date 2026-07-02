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

  getMyBooks: () => api.get("/books/my-books"),

  delete: (id) => api.delete(`/books/${id}`),
};

export const requestsAPI = {

  getCount: () =>
    api.get("/requests/count"),

  create: (bookId) =>
    api.post("/requests", { bookId }),


  getReceived: () =>
    api.get("/requests/received"),


  updateStatus:(id,status)=>
    api.patch(`/requests/${id}/status`,{
      status
    })

};

export const chatAPI = {

  getMessages:(conversationId)=>
    api.get(`/chat/${conversationId}`),


  sendMessage:(conversationId,text)=>
    api.post(`/chat/${conversationId}`,{
      text
    })

};

export const conversationAPI = {

  getMyConversations:()=> 
  api.get("/conversations")
  
  };