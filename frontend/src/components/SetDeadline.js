import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const SetDeadline = ({ date, handleSetDeadline, setDate, message, deadlines, checkpoints, setCheckpoints, frequency, setFrequency }) => {
  const options = [
    { id: 1, option: 'I want checkpoints weekly' },
    { id: 2, option: 'I want checkpoints monthly' },
    { id: 3, option: 'I want to choose the amount of checkpoints' }
  ]
  let weekdays = [
    { id: 1, day: 'Monday' },
    { id: 2, day: 'Tuesday' },
    { id: 3, day: 'Wednesday' },
    { id: 4, day: 'Thursday' },
    { id: 5, day: 'Friday' },
    { id: 6, day: 'Saturday' },
    { id: 7, day: 'Sunday' }
  ]

  const minCheckpoints = 0
  const maxCheckpoints = 12

  const handleNumberInput = event => {
    const numberOfCheckpoints = Math.max(
      minCheckpoints, Math.min(maxCheckpoints, Number(event.target.value))
    )
    setCheckpoints(numberOfCheckpoints)
  }

  return (
    <div>
      <h2 className='text-lg font-medium py-2'>{deadlines.length === 0 ? 'Set a deadline' : 'Set a new deadline'}</h2>
      {message ? <p className='mb-2'>{message}</p> : null}
      <DatePicker
        inline
        selected={date}
        onChange={(newDate) => setDate(newDate)}
        minDate={new Date()}
      />
      <h2 className='text-lg font-medium py-2'>Choose the amount of checkpoints</h2>
      <p>How often do you want checkpoints?</p>
      <select
        className='py-2 px-4 my-2 rounded bg-gray-200'
        defaultValue={frequency}
        onChange={ (e) => setFrequency(Number(e.target.value)) }
      >
        {options.map(o => <option key={o.id} value={o.id}>{o.option}</option>)}
      </select>
      {freqvency === 1 &&
        <div>
          <p>Which day do you want to have your checkpoints?</p>
          <Combobox
            className="flex flex-col mb-4"
            //defaultValue='I want to choose the amount of checkpoint'
            data={weekdays}
            dataKey='id'
            textField='day'
            //onChange={(value) => setFreqvency(value.id)}
          />
        </div>
      }
      {frequency === 3 &&
        <>
          <p>How many checkpoints do you want? ({ minCheckpoints }&ndash;{ maxCheckpoints })</p>
          <input
            className='p-2 px-4 mb-2 bg-gray-200 rounded'
            type='number'
            value={checkpoints}
            onChange={handleNumberInput}
          />
        </>
      }
      <div className="flex justify-center my-5">
        <button
          onClick={handleSetDeadline}
          value="set_deadline"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Set deadline
        </button>
      </div>
    </div>
  )
}

export default SetDeadline