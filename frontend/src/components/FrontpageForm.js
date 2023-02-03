const FrontpageForm = ({
  logout

}) => {
  return (
    <div>
      <form onSubmit={logout}>
        <h2>User is logged in</h2>
        <button type="submit">logout user</button>
      </form>
      <h1>TMC-Coach frontpage</h1>
      <br></br>
      <br></br>
      <h2>Your courses</h2>
      <p>Add new course</p>
    </div>
  )
}

export default FrontpageForm