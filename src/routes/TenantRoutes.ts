import { getAuthHeaders } from "../utils/headers";

const baseURL = process.env.REACT_APP_BASE_URL + 'tenant';

const TenantRoutes = ($api: any) => ({
    filter: (page: number, size: number, search: string) => $api.get(`${baseURL}/filter`, {
        params: { page, size, search },
        headers: getAuthHeaders(),
    }),
    list: () => $api.get(`${baseURL}/list`, {
        headers: getAuthHeaders(),
    }),
    delete: (id: number) => $api.delete(`${baseURL}/delete/${id}`, {
        headers: getAuthHeaders(),
    }),
    update: (id: number, data: any) => $api.put(`${baseURL}/update/${id}`, data, {
        headers: getAuthHeaders(),
    }),
    store: (data: any) => $api.post(`${baseURL}/store`, data, {
        headers: getAuthHeaders(),
    }),
});

export default TenantRoutes;
