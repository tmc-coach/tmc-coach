// import DatePicker, { registerLocale } from 'react-datepicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import NumberPicker from 'react-dom'
import NumberPicker from 'react-widgets/NumberPicker'
// import fi from 'date-fns/locale/fi'

// registerLocale('fi', fi)

const SetDeadline = ({ date, handleSetDeadline, setDate, message, deadlines, checkpoints, setCheckpoints }) => {
  //const [checkpoints, setCheckpoints] = useState(3)

  return (
    <div>
      <h1>{deadlines.length === 0 ? 'Set a deadline' : 'Set a new deadline'}</h1>
      {message ? <p className="flex justify-center px-5 my-5">{message}</p> : null}
      <DatePicker
        inline
        selected={date}
        onChange={(newDate) => setDate(newDate)}
        minDate={new Date()}
        // locale="fi"
      />
      <p>How many checkpoints do you want?</p>
      <NumberPicker
        value={checkpoints}
        onChange={(checkpoints) => setCheckpoints(checkpoints)}
        min={0}
        max={12}
      />
      <div className="flex justify-center my-5">
        <button onClick={handleSetDeadline} value="set_deadline" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Set deadline</button>
      </div>
    </div>
  )
}

export default SetDeadline