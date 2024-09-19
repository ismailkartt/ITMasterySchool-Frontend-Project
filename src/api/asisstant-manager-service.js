import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const getAsisstantManagersByPage = async (page=0, size=20, sort="name",type="ASC")=>{
    const resp = await axios.get(`${baseUrl}/vicedean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers:getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const createAsisstantManager = async (payload) => {
    const resp = await axios.post(`${baseUrl}/vicedean/save`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

export const deleteAsisstantManager = async (id) => {
    const resp = await axios.delete(`${baseUrl}/vicedean/delete/${id}`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const updateAsisstantManager = async (id, payload) => {
    const resp = await axios.put(`${baseUrl}/vicedean/update/${id}`, payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}