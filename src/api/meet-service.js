import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const getMeetsByPage = async (page=0, size=20, sort="date",type="ASC")=>{
    const resp = await axios.get(`${baseUrl}/meet/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers:getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const createMeet = async (payload) => {
    const resp = await axios.post(`${baseUrl}/meet/save`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const updateMeet = async (payload) => {
    const resp = await axios.put(`${baseUrl}/meet/update/${payload.id}`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const deleteMeet = async (id) => {
    const resp = await axios.delete(`${baseUrl}/meet/delete/${id}`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

