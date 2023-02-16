import missing from '../assets/missing.png'

const Organization = ({ organization }) => (
	<div className='m-10'>
		<div className='flex justify-center items-center p-10'>
			<div className='p-2 text-4xl font-medium text-center tracking-medium'>{organization.name}</div>
			<img width={100} height={100} src={organization.logo_path !== 'missing.png' ? `https://tmc.mooc.fi${organization.logo_path}` : missing} />
		</div>
		<div className=''>
			{organization.information}
		</div>
	</div>
)

export default Organization