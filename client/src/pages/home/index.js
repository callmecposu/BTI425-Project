import React, {useEffect, useState} from 'react'

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const jwt = document.cookie.split(';').find(cookie => cookie.includes('jwt')) 
    
    if (!jwt) {
      window.location.href = '/login'
    } else {
      fetch('http://localhost:3001/get_user_from_jwt', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt.split('=')[1]}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          window.location.href = '/login'
        } else {
          setUser(data)
        }
      })
    }
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Welcome, {user ? JSON.stringify(user) : 'User'}</h2>
    </div>
  )
}
