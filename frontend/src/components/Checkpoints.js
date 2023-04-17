import React from 'react'


const Checkpoints = ({ deadlines }) => (
  <>
    <div className='text-lg font-medium pb-2'>Your checkpoints:</div>
    {deadlines.checkpoints.map(checkpoint => (
      <div key={checkpoint.id}>
        <p>{checkpoint.checkpoint_date.split(' ')[0]} - {checkpoint.checkpoint_percent} %</p>
      </div>
    ))}
  </>
)

export default Checkpoints