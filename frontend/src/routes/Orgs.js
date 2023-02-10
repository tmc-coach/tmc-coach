import { useState, useEffect } from 'react'
import Organizations from '../components/Organizations'
import orgService from '../services/org'
import Filter from '../components/Filter'

const Orgs = () => {

  const [orgs, setOrgs] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    orgService.get_orgs().then(orgs => setOrgs(orgs))
  }, [])

  const organizationsToShow = (filter.length === 0) ? orgs : orgs.filter(org => org.name.toLowerCase().includes(filter.toLowerCase()))

  return <div>
    <h1 className='text-3xl font-medium text-center tracking-wide p-10'>All organizations</h1>
    <Filter value={filter} handleChange={({ target }) => setFilter(target.value)} />
    <Organizations organizations={organizationsToShow} />
  </div>
}

export default Orgs