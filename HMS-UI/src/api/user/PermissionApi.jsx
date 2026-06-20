import Api from "../Api";

const endpoint = "/permissions";

const PermissionApi = {
  getAll: () => Api.get(endpoint),
};

export default PermissionApi;