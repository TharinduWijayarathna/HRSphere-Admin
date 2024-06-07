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
    delete: (id: number) => $api.delete(`${baseURL}/${id}`, {
        headers: getAuthHeaders(),
    }),
    update: (id: number, data: any) => $api.put(`${baseURL}/${id}`, data, {
        headers: getAuthHeaders(),
    }),
    create: (data: any) => $api.post(`${baseURL}`, data, {
        headers: getAuthHeaders(),
    }),
});

export default TenantRoutes;
