/****************************************************************************** 
 * BTI425 – Project
 * 
 * I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Group member Name: Vladyslav Huziienko, Maksym Volkovynskyi 
 * Student IDs: 180749210, 126867225
 * Date: 18 April 2024
*****************************************************************************/
import React, {useEffect, useState} from 'react'

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const jwt = document.cookie.split(';').find(cookie => cookie.includes('jwt')) 
    
    if (!jwt) {
      window.location.href = '/login'
    } else {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get_user_from_jwt`, {
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
