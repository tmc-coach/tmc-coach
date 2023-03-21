import { useState, useEffect } from 'react'
import Organizations from '../components/Organizations'
import orgService from '../services/org'
import Filter from '../components/Filter'
import Loading from '../components/Loading'

const FrequentlyUsedOrgs = ({ orgs }) => {
  const frequentlyUsed = orgs.filter(org => org.name === ('MOOC') || org.name === ('Helsingin Yliopisto'))
  return (
    <div>
      <h1>Frequently Used Organizations</h1>
      <Organizations organizations={frequentlyUsed} />
    </div>
  )
}

const Orgs = () => {

  const [orgs, setOrgs] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    orgService.get_orgs().then(orgs => setOrgs(orgs))
  }, [])

  const organizationsToShow = (filter.length === 0) ? orgs : orgs.filter(org => org.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {orgs.length > 0 ? (
        <div className='main container container-fluid'>
          <FrequentlyUsedOrgs orgs={orgs} />
          <h1>All organizations</h1>
          <Filter value={filter} handleChange={({ target }) => setFilter(target.value)} />
          <Organizations organizations={organizationsToShow} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Orgs