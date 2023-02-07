import { useState, useEffect } from 'react'
import Organizations from '../components/Organizations'
import orgService from '../services/org'

const Orgs = () => {

  const [orgs, setOrgs] = useState([])

  useEffect(() => {
    orgService.get_orgs().then(orgs => setOrgs(orgs))
  }, [])

  return <Organizations organizations={orgs} />
}

export default Orgs