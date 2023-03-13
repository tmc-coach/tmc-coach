import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SetDeadline = ({ date, handleSetting, setDate }) => {

  return (
    <div>
      <p className="flex justify-center px-5 m-5">Choose the deadline for this course</p>
      <div className="flex justify-center px-5 m-5">
        <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} minDate={new Date()} inline />
      </div>
      <div className="flex justify-center px-5 m-5">
        <button onClick={handleSetting} value="set_deadline" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Set deadline</button>
      </div>
    </div>
  )
}

export default SetDeadline