import Api from "../Api";

const endpoint = "/users";

const UserApi = {
  getPaged: (params) => Api.get(endpoint, params),
  getById: (id)=> Api.get(`${endpoint}/${id}`),
  create: (data) => Api.post(endpoint, data),
  update: (id, data) => Api.put(`${endpoint}/${id}`, data),
  toggleStatus: (id) => Api.put(`${endpoint}/${id}/toggle-status`),
  delete: (id) => Api.delete(`${endpoint}/${id}`),
  assignRoles: (id, data)=> Api.post(`${endpoint}/${id}/roles`, data)

};

export default UserApi;