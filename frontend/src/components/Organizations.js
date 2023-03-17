import { Link } from 'react-router-dom'
import missing from '../assets/missing.png'

const Organizations = ({ organizations }) => (
  <>
    {organizations
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(org =>
        <div key={org.slug}>
          <Link to={`/orgs/${org.slug}`} className='flex border-gray-300 p-5 mb-5 border rounded hover:shadow-sm hover:shadow-gray-800'>
            <div className='flex shrink-0 items-center w-16 object-center'>
              <img width={50} height={60} src={org.logo_path !== 'missing.png' ? `https://tmc.mooc.fi${org.logo_path}` : missing} />
            </div>
            <div className="flex-initial w-100 px-2">
              <h2 className='text-lg font-medium'>{org.name}</h2>
              {org.information !== '' && <p className="text-base pt-1">{org.information}</p>}
            </div>
          </Link>
        </div>
      )}
  </>
)

export default Organizations