import axios from 'axios'

const BASE_URL = 'http://161.97.110.154'

axios.defaults.withCredentials = true
axios.defaults.baseURL = BASE_URL

export default BASE_URL
