import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const SetDeadline = ({ date, handleSetDeadline, setDate, message, deadlines, checkpoints, setCheckpoints, freqvency, setFreqvency }) => {
  let options = [
    { id: 1, option: 'I want checkpoints weekly' },
    { id: 2, option: 'I want checkpoints monthly' },
    { id: 3, option: 'I want to choose the amount of checkpoints' }
  ]

  return (
    <div>
      <h2>{deadlines.length === 0 ? 'Set a deadline' : 'Set a new deadline'}</h2>
      {message ? <p className="flex justify-center px-5 my-5">{message}</p> : null}
      <DatePicker
        inline
        selected={date}
        onChange={(newDate) => setDate(newDate)}
        minDate={new Date()}
      />
      <h2>Choose the amount of checkpoints</h2>
      <p>How often do you want checkpoints?</p>
      <select onChange={ (e) => setFreqvency(parseInt(e.target.value)) }>
        {options.map(o => <option key={o.id} value={o.id}>{o.option}</option>)}
      </select>
      {freqvency === 3 &&
        <>
          <p>How many checkpoints do you want?</p>
          <input
            type='number'
            value={checkpoints}
            onChange={ (e) => setCheckpoints(parseInt(e.target.value))}
            min='0'
            max='12'
          />
        </>
      }
      <div className="flex justify-center my-5">
        <button onClick={handleSetDeadline} value="set_deadline" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Set deadline</button>
      </div>
    </div>
  )
}

export default SetDeadline