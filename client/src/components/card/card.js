import React, {useState, useAuthor} from 'react'
import { useRouter } from 'next/router'

export default function Card({course}) {
    const router = useRouter()
    return (
        <div className='min-w-[17rem] rounded-2xl shadow-lg'>
            <img src='CH1245.webp' className='rounded-t-2xl' />
            <div className='p-2 h-100'>
                <div className='flex justify-between text-xs mb-2'>
                    <div>Rating: {course?.rating}/5</div>
                    <div>{course?.lectures?.length} Lecture{course?.lectures?.length != 1 && 's'}</div>
                </div>
                <div className='text-lg h-14' style={{fontWeight: 'medium'}}>{course?.title}</div>
                <div className='text-md'>
                    {course?.description.length > 70 ? course?.description.substring(0, 70) + '...' : course?.description}    
                </div>
                <div 
                    className='w-full bg-emerald-700 text-white text-center py-2 mt-3 rounded-md cursor-pointer hover:bg-emerald-800 transition duration-300 ease-in-out'
                    onClick={() => router.push('/course/'+course?._id)}
                >
                    Explore
                </div>
            </div>
        </div>
    )
}
