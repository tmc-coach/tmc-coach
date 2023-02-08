import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/org/' : process.env.REACT_APP_BASEURL + '/org/'

const get_orgs = async () => {
  const response = await axios.get(baseUrl, { headers: { Authorization: localStorage.getItem('user') } })
  return response.data
}


export default { get_orgs }
