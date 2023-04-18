// import DatePicker, { registerLocale } from 'react-datepicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import NumberPicker from 'react-dom'
import NumberPicker from 'react-widgets/NumberPicker'
//import DropdownList from 'react-widgets/DropdownList'
import Combobox from 'react-widgets/Combobox'
// import fi from 'date-fns/locale/fi'

// registerLocale('fi', fi)

const SetDeadline = ({ date, handleSetDeadline, setDate, message, deadlines, checkpoints, setCheckpoints, freqvency, setFreqvency }) => {
  let options = [
    { id: 1, option: 'I want checkpoints weekly' },
    { id: 2, option: 'I want checkpoints monthly' },
    { id: 3, option: 'I want to choose the amount of checkpoints' }
  ]

  return (
    <div>
      {deadlines.length === 0 ? ( <>
        <div className="my-2 rounded-md border-solid border-4 border-black-800">
          <h1>Set a deadline</h1>
          <p>You can set a deadline for the course by choosing the final date
          that you want to finished with the course.
          After that you need to select the amount of the checkpoints.
          The checkpoints will work as waypoints and they will help you
          finish the course step by step until you finish the course.
          </p>
        </div>
      </>
      ) : ( <>
        <h1>Set a new deadline</h1>
        <p>You can change your current deadline for the course by choosing a new date from the calendar and
          selecting a new checkpoints.
        </p>
      </>
      )}
      {message ? <p className="flex justify-center px-5 my-5">{message}</p> : null}
      <DatePicker
        inline
        selected={date}
        onChange={(newDate) => setDate(newDate)}
        minDate={new Date()}
      // locale="fi"
      />
      <div className='text-2xl font-medium pb-5'>
        Choose the amount of checkpoints
      </div>
      <p>How often do you want checkpoints?</p>
      <Combobox
        className="flex flex-col mb-4"
        //defaultValue='I want to choose the amount of checkpoint'
        data={options}
        dataKey='id'
        textField='option'
        onChange={(value) => setFreqvency(value.id)}
      />
      {freqvency === 3 &&
        <div>
          <p>How many checkpoints do you want?</p>
          <NumberPicker
            value={checkpoints}
            onChange={(checkpoints) => setCheckpoints(checkpoints)}
            min={0}
            max={12}
          />
        </div>
      }
      <div className="flex justify-center my-5">
        <button onClick={handleSetDeadline} value="set_deadline" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Set deadline</button>
      </div>
    </div>
  )
}

export default SetDeadline