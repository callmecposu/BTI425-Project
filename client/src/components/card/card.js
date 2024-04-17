import React, {useState, useAuthor} from 'react'
import { useRouter } from 'next/router'

export default function Card({course, wishlist=false, purchased=false, dashboard=false}) {
    const router = useRouter()

    const removeFromWishlist = () => {
        const jwtCookie = document.cookie
            .split(';')
            .find(cookie => cookie.trim().startsWith('jwt='));

        const jwtValue = jwtCookie.split('=')[1];

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/remove_from_wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtValue,
            },
            body: JSON.stringify({course_id: course?._id})
        })
    }

    return (
        <div className='min-w-[17rem] rounded-2xl shadow-lg'>
            <img src='CH1245.webp' className='rounded-t-2xl' />
            <div className='p-2 h-100'>
                {
                    purchased ? 
                    <>
                        <div className='text-lg' style={{fontWeight: 'medium'}}>{course?.title}</div>
                        <div 
                            className='w-full bg-emerald-700 text-white text-center py-2 mt-3 rounded-md cursor-pointer hover:bg-emerald-800 transition duration-300 ease-in-out'
                            onClick={() => router.push('/learn/'+course?._id)}
                        >
                            Continue Learning
                        </div>
                    </> :
                    <>
                        <div className='flex justify-between text-xs mb-2'>
                            <div>Rating: {course?.rating}/5</div>
                            <div>{course?.lectures?.length} Lecture{course?.lectures?.length != 1 && 's'}</div>
                        </div>
                        <div className='text-lg h-14' style={{fontWeight: 'medium'}}>{course?.title}</div>
                        <div className='text-md h-12'>
                            {course?.description.length > 70 ? course?.description.substring(0, 70) + '...' : course?.description}    
                        </div>
                        <div 
                            className='w-full bg-emerald-700 text-white text-center py-2 mt-3 rounded-md cursor-pointer hover:bg-emerald-800 transition duration-300 ease-in-out'
                            onClick={() => router.push('/course/'+course?._id)}
                        >
                            {dashboard ? 'View Course Page' : 'Explore'}
                        </div>
                        {
                            wishlist && 
                            <div 
                                className='w-full border-2 border-emerald-700 text-emerald-700 text-center py-2 mt-3 rounded-md cursor-pointer hover:bg-zinc-100 transition duration-300 ease-in-out'
                                onClick={() => {removeFromWishlist(); window.location.reload()}}
                            >
                                Remove from Wishlist
                            </div>
                        }
                        {
                            dashboard && 
                            <div 
                                className='w-full border-2 border-emerald-700 text-emerald-700 text-center py-2 mt-3 rounded-md cursor-pointer hover:bg-zinc-100 transition duration-300 ease-in-out'
                                onClick={() => {router.push('/edit_course/'+course?._id)}}
                            >
                                Edit Course
                            </div>
                        }
                    </>
                }
                
            </div>
        </div>
    )
}
