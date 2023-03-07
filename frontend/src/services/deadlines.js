import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/deadline' : process.env.REACT_APP_BASEURL + '/deadline'

const get_deadlines = async () => {
  const response = await axios.get(`${baseUrl}/`, { headers: { Authorization: localStorage.getItem('user') } })

  return response.data
}

const set_deadline = async data => {
  //data.date.setHours(12)
  //data.date.setMinutes(0)
  //data.date.setSeconds(0)
  //console.log(data.date.toLocaleDateString({ timeZone: 'Europe/Helsinki' }))
  //console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Helsinki' }).format(data.date))
  //data.date = data.date.toLocaleDateString('fa-IR', { timeZone: 'Europe/Helsinki' })
  data.date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Helsinki' }).format(data.date)
  //console.log(data.date)

  const response = await axios.post(`${baseUrl}/`, data, { headers: { Authorization: localStorage.getItem('user') } })

  return response.data
}

export default { get_deadlines, set_deadline }