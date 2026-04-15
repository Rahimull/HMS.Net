import Api from "../Api";

const endpoint = "/Suplier";

const SuplierApi = {
  getPaged: (queryParams) =>
    Api.post(`${endpoint}/paged`, {
      params: queryParams,
    }),

  create: (data) => Api.post(endpoint, data),
  update: (id, data) => Api.put(`${endpoint}/${id}`, data),
  delete: (id) => Api.delete(`${endpoint}/${id}`),
};

export default SuplierApi;