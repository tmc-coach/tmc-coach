import React from 'react'

const Checkpoints = ({ deadlines }) => {
  console.log(deadlines)
  return (
    <div>
      <h1>Your checkpoints</h1>
      {deadlines.checkpoints.map(checkpoint => (
        <div key={checkpoint.id}>
          <p>{checkpoint.checkpoint_date}</p>
        </div>
      ))}
    </div>
  )
}

export default Checkpoints