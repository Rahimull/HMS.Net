import Api from "../Api";

const endpoint = "/pharmacy/sales";

const SaleApi = {
  getPaged: (queryParams) =>
    Api.get(endpoint, {
      params: queryParams,
    }),

  create: (data) => Api.post(endpoint, data),
  update: (id, data) => Api.put(`${endpoint}/${id}`, data),
  delete: (id) => Api.delete(`${endpoint}/${id}`),
};

export default SaleApi;