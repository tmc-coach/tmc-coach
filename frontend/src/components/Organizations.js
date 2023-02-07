import { Link } from 'react-router-dom'

const Organizations = ({ organizations }) => (
  <div>
    <h2>All organizations</h2>
    <div>
      {organizations
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(org =>
          <div key={org.slug}>
            <Link to={`/orgs/${org.slug}`}>{org.name}</Link>
          </div>
        )}
    </div>
  </div>
)

export default Organizations