// import Api from "./Api";

// const endpoint = "/department";

// const DepartmentApi = {
//     getAll: () => Api.get(endpoint),
//     getById: (id) => Api.get(`${endpoint}/${id}`),
//     create: (data) => Api.post(endpoint, data),
//     update: (id, data) => Api.put(`${endpoint}/${id}`, data),
//     delete: (id) => Api.delete(`${endpoint}/${id}`),
// }

// export default DepartmentApi;



import Api from "./Api";

const endpoint = "/department";

const DepartmentApi = {
  // ✅ PAGED - GET with QueryString
  getPaged: (pagination) =>
    Api.get(endpoint, {
      params: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    }),

  // CRUD
  getById: (id) => Api.get(`${endpoint}/${id}`),
  create: (data) => Api.post(endpoint, data),
  update: (id, data) => Api.put(`${endpoint}/${id}`, data),
  delete: (id) => Api.delete(`${endpoint}/${id}`),
};

export default DepartmentApi;