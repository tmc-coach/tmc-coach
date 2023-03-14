import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND + '/org'

const get_orgs = async () => {
  const response = await axios.get(`${baseUrl}/`, {
    headers: { Authorization: localStorage.getItem('user') },
  })
  return response.data
}

const get_org = async (org_slug) => {
  const response = await axios.get(`${baseUrl}/`, {
    headers: { Authorization: localStorage.getItem('user') },
  })
  const org = response.data.filter((org) => org.slug === org_slug)
  return org
}

const get_courses = async (org_slug) => {
  const response = await axios.get(`${baseUrl}/${org_slug}/courses`, {
    headers: { Authorization: localStorage.getItem('user') },
  })

  return response.data
}

export default { get_orgs, get_org, get_courses }
