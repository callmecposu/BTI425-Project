import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { getUserFromJWT } from '@/utils/cookies'

export default function Layout() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserFromJWT().then(data => {
            setIsLoggedIn(true);
            setUser(data);
        })
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
                <div className='flex items-center'>
                    <div onClick={() => {router.push('/history')}} className='mr-4 text-emerald-700 text-2xl cursor-pointer mt-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5m4-1v5l4 2"/></g></svg>
                    </div>
                    {
                        user?.name ? 
                        <div className='flex gap-4 items-center'>
                            <div className='text-3xl text-emerald-700 cursor-pointer' onClick={() => {router.push('/wishlist')}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="currentColor"><path d="M20 6h4v2.644c1.273-.078 2.506-.004 3.614.23c-4.7 1.85-6.863 6.605-7.217 7.383l-.022.048c-1.149-.174-2.393-.32-3.57-.309c-1.214.104-2.391.283-4.33 1.375c-.274.194-.642.51-1.143.994c-.036-.027-.075-.05-.126-.083a5.475 5.475 0 0 1-.151-.096a11.58 11.58 0 0 0-1.174-.67c-1.016-.504-2.262-.933-3.483-.933v-3.879c2.111 0 4.01.717 5.305 1.36c.449.223.843.445 1.17.643a7.51 7.51 0 0 1 1.125-1.717L11.8 9.543l3.521-2.287l2.027 3.18a15.98 15.98 0 0 1 2.651-1.068zm10.757 8.691c-1.458.676-2.72 1.786-3.857 3.924c0 0-2.524-1.154-4.572-1.754c1.572-3.186 3.4-4.978 6.097-6.228c2.609-1.21 5.72-1.52 9.418-1.391L37.667 14c-3.41-.118-5.365-.025-6.91.691"/><path d="M13.281 19.22c-7.263 6.478 3.112 22.673 11.413 22.673c8.3 0 19.73-16.181 11.413-23.599a46.84 46.84 0 0 1-.516-.468c-.688-.63-1.145-1.05-2.414-1.804c-2.552 0-4.09 2.553-4.79 4.109a1.16 1.16 0 0 1-.13.22l-1.615 4.49l-.581 2.089a1 1 0 0 0 .045.665l.68 1.57l3.517-.408l.231 1.986l-3.309.385l.215 3.151l-1.995.136l-.268-3.931l-.906-2.095a3 3 0 0 1-.137-1.996l.017-.062l-2.034.92l-1.33 3.361l-1.86-.736l1.054-2.662l-3.21-.756l.458-1.947l4.006.944L24.89 23.8l1.23-3.42c-3.168-1.489-9.674-3.985-12.84-1.162"/></g></svg>                            </div>
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
