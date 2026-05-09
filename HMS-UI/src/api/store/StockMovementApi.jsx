import Api from "../Api";

const endpoint = "/StockMovement";

const StockMovementApi = {
  getPaged: (queryParams) =>
    Api.post(`${endpoint}/paged`, queryParams),

  create: (data) => Api.post(endpoint, data),
  update: (id, data) => Api.put(`${endpoint}/${id}`, data),
  delete: (id) => Api.delete(`${endpoint}/${id}`),
  getKpi: () => Api.get(`${endpoint}/kpi`)
};

export default StockMovementApi;