import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DeadlineSetting = ({ date, handleSetting, setDate }) => {
  return (
    <div>
      <p>Choose the deadline for this course</p>
      <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} minDate={new Date()} inline />
      <button onClick={handleSetting} value="set_deadline">Set deadline</button>
    </div>
  )
}

export default DeadlineSetting