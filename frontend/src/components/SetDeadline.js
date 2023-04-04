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
    { id: 3, option: 'I want to choose the amount of checkpoint' }
  ]

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
        onChange={value => setFreqvency(value.id)}
      />
      {freqvency === 3 ?
        <div>
          <p>How many checkpoints do you want?</p>
          <NumberPicker
            value={checkpoints}
            onChange={(checkpoints) => setCheckpoints(checkpoints)}
            min={0}
            max={12}
          />
        </div>
        : null
      }
      <div className="flex justify-center my-5">
        <button onClick={handleSetDeadline} value="set_deadline" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Set deadline</button>
      </div>
    </div>
  )
}

export default SetDeadline