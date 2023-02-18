import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/deadline/' : process.env.REACT_APP_BASEURL + '/deadline/'

const set_deadline = async data => {
  console.log(data)

  const response = await axios.post(`${baseUrl}set_deadline`, data, { headers: { Authorization: localStorage.getItem('token') } })

  return response.data
}


export default { set_deadline }