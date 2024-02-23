import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../redux/slices/userSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, error } = useSelector(state => state.user || {})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginEvent = e => {
    e.preventDefault()
    let userCredential = {
      email,
      password
    }
    dispatch(loginUser(userCredential)).then(result => {
      if (result.payload) {
        setEmail('')
        setPassword('')
        navigate('/')
      }
    })
  }

  return (
    <form onSubmit={handleLoginEvent}>
      <label htmlFor="">Email</label>
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <label htmlFor="">Password</label>
      <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="submit">{loading ? 'Loading...' : 'LOG IN'}</button>
      {error && <div role="alert">{error}</div>}
    </form>
  )
}

export default Login
