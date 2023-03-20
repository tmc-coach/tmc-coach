// import DatePicker, { registerLocale } from 'react-datepicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import fi from 'date-fns/locale/fi'

// registerLocale('fi', fi)

const DeadlineSetting = ({ date, handleSetting, setDate }) => {
  return (
    <div>
      <p className="flex justify-center my-5">Choose the deadline for this course</p>
      <div className="flex justify-center my-5">
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          minDate={new Date()}
          inline
          // locale="fi"
        />
      </div>
      <div className="flex justify-center my-5">
        <button onClick={handleSetting} value="set_deadline" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Set deadline</button>
      </div>
    </div>
  )
}

export default DeadlineSetting