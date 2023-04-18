import React from 'react'

const formatDate = (d) => {
  const date = new Date(d)
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

const Checkpoints = ({ deadlines }) => {
  return (
    <>
      <div className='text-lg font-medium pb-2'>Your checkpoints:</div>
      {deadlines.checkpoints.map(checkpoint => (
        <div key={checkpoint.id} className="my-3">
          <p>{checkpoint.checkpoint_percent}%<span className="border-indigo-500 border-solid border-2 mx-2"></span>{formatDate(checkpoint.checkpoint_date.split(' ')[0])}</p>
        </div>
      ))}
    </>
  )
}

export default Checkpoints