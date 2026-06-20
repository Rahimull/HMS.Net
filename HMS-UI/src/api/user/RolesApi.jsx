import Api from "../Api";

const endpoint = "/roles";

const RolesApi = {
  getAll: () => Api.get(endpoint),
  getById: (id) => Api.get(`${endpoint}/${id}`),
  create: (data) => Api.post(endpoint, data),
  update: (id, data) => Api.put(`${endpoint}/${id}`, data),
  toggleStatus: (id) => Api.put(`${endpoint}/${id}/toggle-status`),
  delete: (id) => Api.delete(`${endpoint}/${id}`),

  getPermissions: (id) => Api.get(`${endpoint}/${id}/permissions`),

  assignPermissions: (id, data) =>
    Api.post(`${endpoint}/${id}/permissions`, data),
};

export default RolesApi;
