import Api from "../Api";

const endpoint = "/SalePayment";

const SalePaymentApi = {
  getPaged: (queryParams) =>
    Api.post(`${endpoint}/paged`,queryParams),

  create: (data) => Api.post(endpoint, data),
  update: (id, data) => Api.put(`${endpoint}/${id}`, data),
  delete: (id) => Api.delete(`${endpoint}/${id}`),
};

export default SalePaymentApi;