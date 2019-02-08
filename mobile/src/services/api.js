import axios from 'axios'

const api = axios.create({
    baseURL: 'https://gotwapi.herokuapp.com'
})

export default api