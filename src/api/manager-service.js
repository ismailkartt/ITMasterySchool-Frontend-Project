import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const getManagersByPage = async (page=0, size=20, sort="name",type="ASC")=>{
    const resp = await axios.get(`${baseUrl}/dean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers:getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const createManager = async (payload) => {
    const resp = await axios.post(`${baseUrl}/dean/save`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
} 

export const deleteManager = async (id) => {
    const resp = await axios.delete(`${baseUrl}/dean/delete/${id}`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const updateManager = async (id, payload) => {
    const resp = await axios.put(`${baseUrl}/dean/update/${id}`, payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}