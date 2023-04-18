import Checkpoints from './Checkpoints'

const Deadline = ({ deadlines, onDelete }) => (

  <div className="order-last my-4 mx-auto h-full max-w-2xl rounded-md border-solid border-4 border-black-800">
    <p key={deadlines.id} className="flex justify-center px-5 m-5 text-2xl">You have planned to complete this course by {deadlines.date.split(' ')[0]}</p>
    {deadlines.checkpoints && <Checkpoints deadlines={deadlines} />}
    <div className="flex justify-center px-5 m-5">
      <button onClick={onDelete} value="delete_deadline" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">Delete deadline</button>
    </div>
  </div>
)

export default Deadline