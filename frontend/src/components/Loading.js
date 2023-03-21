import loading from '../assets/loading.png'

const Loading = () => (
  <div className="flex h-screen">
    <div className="flex m-auto">
      <img className="h-20 w-20 animate-spin" src={loading} alt="" />
    </div>
  </div>
)

export default Loading