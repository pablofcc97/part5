import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const login= (event) => {
    event.preventDefault()
    handleLogin({ username : userName, password, })
    setUserName('')
    setPassword('')
  }
  return(
    <form onSubmit={login} className='form--login'>
      <div>
        username
        <input
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
          className='loginInput--username'
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          className='loginInput--password'
        />
      </div>
      <button type="submit" className='loginInput--submit'>login</button>
    </form>
  )
}

export default LoginForm