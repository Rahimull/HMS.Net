import Api from "../Api";

const endpoint = "/ItemStock";

const ItemStockApi = {
  getPaged: (queryParams) =>
    Api.post(`${endpoint}/paged`, queryParams),
  getById: (id) => Api.get(`${endpoint}/${id}`),
  create: (data) => Api.post(endpoint, data),
  update: (id, data) => Api.put(`${endpoint}/${id}`, data),
  delete: (id) => Api.delete(`${endpoint}/${id}`),
  getKpi: () => Api.get(`${endpoint}/kpi`), 
};

export default ItemStockApi;