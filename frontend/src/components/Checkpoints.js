import React from 'react'

const Checkpoints = ({ deadlines }) => {

  return (
    <div>
      <div className="text-lg font-medium pb-2">Your checkpoints:</div>
      {deadlines.checkpoints.map(checkpoint => (
        <div key={checkpoint.id}>
          <p>{checkpoint.checkpoint_date.split(' ')[0]}</p>
        </div>
      ))}
    </div>
  )
}

export default Checkpoints