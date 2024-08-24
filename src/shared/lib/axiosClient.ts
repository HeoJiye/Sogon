import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    withCredentials: true,
  },
});

export default axiosClient;
