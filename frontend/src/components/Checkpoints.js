import React from 'react'

const formatDate = (d) => {
  const date = new Date(d)
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

const Checkpoints = ({ deadlines }) => {
  return (
    <>
      <div className='text-lg font-medium pb-2'>Your checkpoints:</div>
      <table className='mx-auto'>
        <tbody>
          {deadlines.checkpoints.map(checkpoint => (
            <tr key={checkpoint.id}>
              <td className='p-1'>{checkpoint.checkpoint_percent}%</td>
              <td><span className="border-indigo-500 border-solid border-2 mx-2"></span></td>
              <td>{formatDate(checkpoint.checkpoint_date.split(' ')[0])}</td>
              <td><span className="border-indigo-500 border-solid border-2 mx-2"></span></td>
              <td className='p-1'>{checkpoint.desired_points} points should be completed</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Checkpoints