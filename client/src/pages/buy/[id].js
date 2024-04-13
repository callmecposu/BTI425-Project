import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { useState, useEffect } from 'react'
import { getUserFromJWT } from '@/utils/cookies'

export default function CoursePage() {
    const router = useRouter()
    const { id } = router.query
    const [course, setCourse] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (!router.isReady) return;
        
        const jwtCookie = document.cookie
            ?.split(';')
            ?.find(cookie => cookie.trim().startsWith('jwt='));

        const jwtValue = jwtCookie?.split('=')[1];
        let headers = {
            'Content-Type': 'application/json',
        }
        if(jwtValue) {
            headers['Authorization'] = 'Bearer ' + jwtValue;
        }

        fetch(`http://localhost:3001/course/${id}`, {
            headers: headers
        })
        .then(res => res.json())
        .then(data => {
            setCourse(data)
        })

        getUserFromJWT().then(data => {
            setUser(data);
        })
    }, [router.isReady])

    useEffect(() => {
        if(user?.purchased_courses?.includes(id)) {
            router.push('/learn/'+id)
        }
    }, [user])

    return (
        <>
            <Layout />
            <div className='container m-auto p-4 mt-10 pt-4 flex mt-4'>
                <div className='w-64 rounded-2xl shadow-lg mr-8 pb-3 h-full'>
                    <img src='/CH1245.webp' className='rounded-t-2xl' />
                    <div className='p-2'>
                        <div className='text-lg' style={{fontWeight: 'medium'}}>{course?.course?.title}</div>
                        <div className='text-xl' style={{fontWeight: 'bold'}}>${course?.course?.price}</div>
                    </div>
                </div>
                <div className='flex-1'>
                    <input
                        type='text'
                        placeholder='Card Number'
                        className='w-full border-2 border-gray-300 rounded-full p-2 mb-3 px-4' 
                    />
                    <input
                        type='text'
                        placeholder='Card Holder Full Name'
                        className='w-full border-2 border-gray-300 rounded-full p-2 mb-3 px-4' 
                    />
                    <div className='flex gap-4'>
                        <input
                            type='text'
                            placeholder='Expiry Date'
                            className='border-2 border-gray-300 rounded-full p-2 px-4' 
                        />
                        <input
                            type='text'
                            placeholder='CVV Code'
                            className='border-2 border-gray-300 rounded-full p-2 px-4' 
                        />
                    </div>
                    <div className='mt-3 ml-2'>
                        <input type='checkbox' className='mr-2' />
                        <span>I agree to the terms and conditions</span>
                    </div>
                    <button className='w-full bg-emerald-700 text-white text-center py-2 mt-3 rounded-full max-w-72 cursor-pointer hover:bg-emerald-800 transition duration-300 ease-in-out'>
                        Purchase
                    </button>
                </div>
            </div>
        </>
    )
}
