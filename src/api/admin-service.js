import { config } from "../helpers/config";

const baseUrl = config.api.baseUrl;

export const getAdminsByPage = async (page, size, sort, type) => {
    const resp = await axios.get(`${baseUrl}/admin/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,
         {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

