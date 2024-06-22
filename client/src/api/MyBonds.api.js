import axios from 'axios'

export const getMyBonds = () =>{
    return axios.get('http://localhost:8000/api/v1/mybonds/')
}