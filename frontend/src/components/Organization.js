import missing from '../assets/missing.png'

const Organization = ({ organization }) => (
  <>
    <div className='flex justify-center items-center py-10'>
      <div className='p-2 text-3xl md:text-4xl font-medium text-center'>{organization.name}</div>
      <img width={100} height={100} src={organization.logo_path !== 'missing.png' ? `https://tmc.mooc.fi${organization.logo_path}` : missing} />
    </div>
    <p className='py-4'>
      {organization.information}
    </p>
  </>
)

export default Organization