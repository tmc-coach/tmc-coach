import axios from 'axios'

const prod = process.env.NODE_ENV === 'production'
const baseUrl = prod ? '/api/org' : process.env.REACT_APP_BASEURL + '/org'

const get_orgs = async () => {
  const response = await axios.get(`${baseUrl}/`, {
    headers: { Authorization: localStorage.getItem('user') },
  })
  return response.data
}

const get_org = async (org_slug) => {
  const response = await axios.get(`${baseUrl}/${org_slug}`, {
    headers: { Authorization: localStorage.getItem('user') },
  })
  //const org = response.data.filter((org) => org.slug === org_slug)
  console.log(response.data)
  return response.data
}

const get_courses = async (org_slug) => {
  const response = await axios.get(`${baseUrl}/${org_slug}/courses`, {
    headers: { Authorization: localStorage.getItem('user') },
  })

  return response.data
}

export default { get_orgs, get_org, get_courses }
