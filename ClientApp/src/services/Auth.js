import axios from "axios"

export const register = (user) => {
    return axios.post("https://localhost:7239/api/Auth/register", user);
}