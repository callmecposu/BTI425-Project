import React from 'react'
import { useRouter } from 'next/router'

export default function Card() {
    const router = useRouter()
    return (
        <div className='w-64 rounded-2xl shadow-lg'>
            <img src='CH1245.webp' className='rounded-t-2xl' />
            <div className='p-2'>
                <div className='flex justify-between text-xs mb-2'>
                    <div>15 Hours</div>
                    <div>Medium</div>
                </div>
                <div className='text-lg' style={{fontWeight: 'medium'}}>Advanced Security Course</div>
                <div className='text-sm mb-1' style={{fontWeight: 'bolder'}}>Presented by Acme</div>
                <div className='text-md'>
                    Cyber security is the practice of defending computers, servers, mobile devices, electronic 
                </div>
                <div 
                    className='w-full bg-emerald-700 text-white text-center py-2 mt-3 rounded-md cursor-pointer hover:bg-emerald-800 transition duration-300 ease-in-out'
                    onClick={() => router.push('/course')}
                >
                    Explore
                </div>
            </div>
        </div>
    )
}
