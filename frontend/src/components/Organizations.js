import { Link } from 'react-router-dom'
import missing from '../assets/missing.png'

const Organizations = ({ organizations }) => (
  <div>
    <h1 className='text-3xl font-medium text-center tracking-wide p-10'>All organizations</h1>
    <div>
      {organizations
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(org =>
          <Link to={`/orgs/${org.slug}`} key={org.slug}>
            <div className='flex border p-5 m-5 border rounded mx-10 hover:bg-stone-100' key={org.slug}>
              <div className='flex shrink-0 items-center w-16 object-center'>
                <img width={50} height={60} src={org.logo_path !== 'missing.png' ? `https://tmc.mooc.fi${org.logo_path}` : missing} />
              </div>
              <div className="flex-initial w-100 px-2">
                <h2 className='text-lg font-medium'>{org.name}</h2>
                {org.information !=='' && <p className="text-base pt-1">{org.information}</p>}
              </div>
            </div>
          </Link>
        )}
    </div>
  </div>
)

export default Organizations