import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { useState, useEffect } from 'react'

export default function CoursePage() {
    const router = useRouter()
    const { id } = router.query
    const [course, setCourse] = useState(null)

    useEffect(() => {
        if (!router.isReady) return;
        
        const jwtCookie = document.cookie
            .split(';')
            .find(cookie => cookie.trim().startsWith('jwt='));

        const jwtValue = jwtCookie.split('=')[1];

        fetch(`http://localhost:3001/course/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtValue,
            }
        })
            .then(res => res.json())
            .then(data => {
                setCourse(data)
            })
    }, [router.isReady])

    return (
        <>
            <Layout />
            <div className='container m-auto p-4 mt-10 pt-2 flex'>
                <div className='w-64 rounded-2xl shadow-lg mr-8 pb-3'>
                    <img src='/CH1245.webp' className='rounded-t-2xl' />
                    <div className='p-2'>
                        <div className='text-lg' style={{fontWeight: 'medium'}}>{course?.course?.title}</div>
                        <div className='text-xl' style={{fontWeight: 'bold'}}>${course?.course?.price}</div>
                        <div className='rounded-full bg-emerald-700 text-white mt-2 py-1 text-center'>Buy Now</div>
                        <div className='rounded-full text-emerald-700 border-2 border-emerald-700 mt-2 py-1 text-center'>Add to Wishlist</div>
                    </div>
                </div>
                <div>
                    <div>{course?.course?.description}</div>
                    <div className='flex gap-12 pl-6 mt-4 mb-4'>
                        <ul className='list-disc'>
                            {
                                course?.course?.learning_outcomes.map((outcome, index) => {
                                    if (index % 2 == 0) {
                                        return <li key={index}>{outcome}</li>;
                                    }
                                    return null;
                                })
                            }
                        </ul>
                        <ul className='list-disc'>
                            {
                                course?.course?.learning_outcomes.map((outcome, index) => {
                                    if (index % 2 !== 0) {
                                        return <li key={index}>{outcome}</li>;
                                    }
                                    return null;
                                })
                            }
                        </ul>
                    </div>
                    <div className='border-2 rounded-xl p-4 border-zinc-200 mb-4 flex flex-col gap-2'>
                            {
                                course?.lectures?.length > 0 ?
                                course?.lectures?.map((lecture, index) => (
                                    <div key={index} className='flex items-center gap-4'>
                                        <div className='w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center'>{index + 1}</div>
                                        <i>{lecture.title}</i>
                                    </div>
                                )) : 
                                <div>No lectures found</div>
                            }
                    </div>
                    <div className='flex items-center'>
                        <div className='w-8 h-8 rounded-full bg-zinc-200 mr-2'></div>
                        <div>by {course?.author?.name}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
