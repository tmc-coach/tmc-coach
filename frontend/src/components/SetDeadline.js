import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Loading from '../components/Loading'
import React, { useState, useEffect } from 'react'

const SetDeadline = ({ date, handleSetDeadline, setDate, message, deadlines, checkpoints, setCheckpoints, frequency, setFrequency }) => {
  const options = [
    { id: 1, option: 'I want checkpoints weekly' },
    { id: 2, option: 'I want checkpoints monthly' },
    { id: 3, option: 'I want to choose the amount of checkpoints' }
  ]

  const minCheckpoints = 0
  const maxCheckpoints = 12

  const handleNumberInput = event => {
    const numberOfCheckpoints = Math.max(
      minCheckpoints, Math.min(maxCheckpoints, Number(event.target.value))
    )
    setCheckpoints(numberOfCheckpoints)
  }

  const [LoadingSpinner, setLoadingSpinner] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingSpinner(false)
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [])


  return (
    <div>
      {LoadingSpinner ? (
        <Loading />
      ) : deadlines.length === 0 ? (
        <>
          <h1>Set a deadline</h1>
          <p>
            To schedule the course, first, you need to choose the final date for
            the deadline from the calendar. Then select amount of checkpoints
            from the menu. Checkpoints are smaller deadlines for the course and will
            be distributed automatically based on your preferences. Each checkpoint
            will include a similar amount of work. TMC Coach will cheer and keep in
            touch with you by email. Enjoy studying!
          </p>
        </>
      ) : (
        deadlines.length !== 0 && (
          <>
            <h1>Set a new deadline</h1>
            <p>
              You can change your current deadline for the course by choosing a new
              date from the calendar and select new checkpoints from the menu.
            </p>
          </>
        )
      )}
      {message ? <p className="flex justify-center px-5 my-5">{message}</p> : null}
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
