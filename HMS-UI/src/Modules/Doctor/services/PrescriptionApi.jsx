import Api from "../../../api/Api"

const endpoint = "/Prescription";

const PrescriptionApi = {
    getAll: () => Api.get(endpoint),
    getById: (id) => Api.get(`${endpoint}/${id}`),
    create: (data) => Api.post(endpoint, data),
    update: (id, data) => Api.put(`${endpoint}/${id}`, data),
    delete: (id) => Api.delete(`${endpoint}/${id}`),
}

export default PrescriptionApi;

