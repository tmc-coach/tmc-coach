import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SetDeadline = ({ date, handleSetDeadline, setDate, message }) => {

  return (
    <div>
      <h1 className='text-3xl font-medium text-center tracking-wide py-10'>Set a deadline</h1>
      {message ? <p className="flex justify-center px-5 my-5">{message}</p> : null}
      <div>
        <DatePicker inline selected={date} onChange={(newDate) => setDate(newDate)} minDate={new Date()} />
      </div>
      <div className="flex justify-center px-5 m-5">
        <button onClick={handleSetDeadline} value="set_deadline" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Set deadline</button>
      </div>
    </div>
  )
}

export default SetDeadline