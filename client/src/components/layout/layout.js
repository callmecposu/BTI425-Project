import React, {useEffect, useState} from 'react'

export default function Layout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const jwtCookie = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('jwt='));

        if (jwtCookie) {
            const jwtValue = jwtCookie.split('=')[1];
            fetch('http://localhost:3001/get_user_from_jwt', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtValue,
                }
            }).then(res => res.json()).then(data => {
                setIsLoggedIn(true);
                setUser(data);
            })
            console.log('JWT:', jwtValue);
        } else {
            console.log('JWT cookie not found');
        }
    }, [])

    return (
        <div className='p-4 shadow-xl bg-white'>
            <div className='container flex justify-between m-auto items-center'>
                <div className='flex items-center'>
                    <a 
                        className='text-3xl text-emerald-700 mr-8 text-bold' 
                        style={{fontWeight: 'bold'}}
                        href='/'
                    >
                        Learnify
                    </a>
                    <div>
                        <a href='/' className='text-md text-light mr-4'>Explore Courses</a>
                        <a href='/my-learning' className='text-md text-light'>My Learning</a>
                    </div>
                </div>
                <div>
                    {
                        user?.name ? 
                        <div className='flex gap-4'>
                            <div>
                                Welcome, <b>{user?.name}</b>
                            </div>
                            <div className='text-red-600 flex items-center gap-1 cursor-pointer' onClick={() => {
                                document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                window.location.reload();
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/></svg>
                                Logout
                            </div>
                        </div> :
                        <a href='/login' className='bg-emerald-700 text-white rounded-xl py-2 px-4'>Login</a>
                    }
                </div>
            </div>
        </div>
    )
}
