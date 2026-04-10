import Api from "../../../api/Api"

const endpoint = "/Diagnosis";

const DiagnosisApi = {
    getAll: () => Api.get(endpoint),
    getById: (id) => Api.get(`${endpoint}/${id}`),
    create: (data) => Api.post(endpoint, data),
    update: (id, data) => Api.put(`${endpoint}/${id}`, data),
    delete: (id) => Api.delete(`${endpoint}/${id}`),
}

export default DiagnosisApi;

