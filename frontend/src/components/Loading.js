import loading from '../assets/loading.png'

const Loading = () => (
  <div className="flex h-screen m-10">
    <div className="flex justify-center items-center">
      <img className="h-20 w-20 animate-spin" src={loading} alt="" />
    </div>
  </div>
)

export default Loading