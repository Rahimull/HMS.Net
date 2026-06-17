// import Api from "./Api";

// const endpoint = "/department";

// const DepartmentApi = {
//   getPaged: (Params) =>
//     Api.post(`${endpoint}/paged`, Params),

//   create: (data) => Api.post(endpoint, data),
//   update: (id, data) => Api.put(`${endpoint}/${id}`, data),
//   delete: (id) => Api.delete(`${endpoint}/${id}`),
// };

// export default DepartmentApi;


import Api from "./Api";

const DepartmentApi = {
  getPaged: (params) =>
    Api.post("/department/paged", params, {
      headers: {
        "Content-Type": "application/json",
      },
    }),

  create: (data) => Api.post("/department", data),
  update: (id, data) => Api.put(`/department/${id}`, data),
  delete: (id) => Api.delete(`/department/${id}`),
};

export default DepartmentApi;