function ErrorBoundary() {

  return (
    <div id='error' className='flex justify-center mt-10'>
      <div className='flex-initial mx-12 border border-slate-400 text-center px-12 py-2'>
        <div className='text-lg font-medium text-red-500 p-2'>
          The page you were looking for does not exist.
        </div>
        <div className='p-2 text-slate-600'>
          You may have mistyped the address or the page may have moved.
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary