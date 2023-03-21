// import DatePicker, { registerLocale } from 'react-datepicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import fi from 'date-fns/locale/fi'

// registerLocale('fi', fi)

const SetDeadline = ({ date, handleSetDeadline, setDate, message, deadlines }) => {

  return (
    <div>
      <h1 className='text-3xl font-medium text-center tracking-wide my-5'>{deadlines.length === 0 ? 'Set a deadline' : 'Set a new deadline'}</h1>
      {message ? <p className="flex justify-center px-5 my-5">{message}</p> : null}
      <div>
        <DatePicker
          inline
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          minDate={new Date()}
          // locale="fi"
        />
      </div>
      <div className="flex justify-center my-5">
        <button onClick={handleSetDeadline} value="set_deadline" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Set deadline</button>
      </div>
    </div>
  )
}

export default SetDeadline