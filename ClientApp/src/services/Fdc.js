import axios from "axios";

const apiKey = 'beRFFWSIsr5S5dntcc8JS1tFscBHd5mtbkonR5Ps'

export const searchFdc = (searchTerm) => {
    return axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${searchTerm}`)
}
