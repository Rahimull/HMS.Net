import Api from "./Api";

export const createCrudApi = (endpoint) => ({
  getPaged: (queryParams) =>
    Api.post(`${endpoint}/paged`, queryParams),

  create: (data) =>
    Api.post(endpoint, data),

  update: (id, data) =>
    Api.put(`${endpoint}/${id}`, data),

  delete: (id) =>
    Api.delete(`${endpoint}/${id}`),
});