import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseUrl = config.api.baseUrl;

export const getStudentInfoByPage = async (page=0, size=20, sort="name",type="ASC")=>{
    const resp = await axios.get(`${baseUrl}/studentInfo/getAllForTeacher?page=${page}&size=${size}&sort=${sort}&type=${type}`,
        {headers:getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const createStudentInfo = async (payload) => {
    const resp = await axios.post(`${baseUrl}/studentInfo/save`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const updateStudentInfo = async (payload) => {
    const resp = await axios.put(`${baseUrl}/studentInfo/update/${payload.id}`,payload,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

export const deleteStudentInfo = async (id) => {
    const resp = await axios.delete(`${baseUrl}/studentInfo/delete/${id}`,
        {headers: getAuthHeader()})
    const data = await resp.data;
    return data;
}

