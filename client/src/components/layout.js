import React from 'react'

export default function Layout() {
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
                    <a href='/login' className='bg-emerald-700 text-white rounded-xl py-2 px-4'>Login</a>
                </div>
            </div>
        </div>
    )
}
