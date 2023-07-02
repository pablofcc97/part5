const Notification = ({ message,success }) => {
  if (message === '') {
    return null
  }
  if(success===true){
    return (
      <div className="message success">
        {message}
      </div>
    )
  }
  return (
    <div className="message error">
      {message}
    </div>
  )
}

export default Notification