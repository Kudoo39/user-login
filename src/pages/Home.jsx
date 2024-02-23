import { useState } from 'react'
import { Link } from 'react-router-dom'

const getUser = () => {
  let user = localStorage.getItem('user')
  if (user) {
    user = JSON.parse(user)
  } else {
    user = null
  }
  return user
}

const Home = () => {
  const [user, setUser] = useState(() => getUser())

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <>
      {user ? (
        <>
          <h3>
            Hello, {user.firstName} {user.lastName}
          </h3>
          <h4>{user.email}</h4>
          <button onClick={handleLogout}>LOG OUT</button>
        </>
      ) : (
        <Link to="/login">
          <button>LOG IN</button>
        </Link>
      )}
    </>
  )
}

export default Home
