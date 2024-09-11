import axios from "axios"

export const login = async (payload) => {
    const resp = await axios.post("https://mycampusmates.com/app/auth/login", payload)
    const data = await resp.data;
    return data;
}