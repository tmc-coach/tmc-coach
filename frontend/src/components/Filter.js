const Filter = ({ value, handleChange }) => (
  <div className="flex justify-center px-5 m-5">
    <input type="search" className="placeholder-gray-500 p-2 flex-auto border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
      value={value}
      onChange={handleChange}
      placeholder="Search"
    />
  </div>
)

export default Filter