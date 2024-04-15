import React, {useState, useEffect} from 'react'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import { getUserFromJWT } from '@/utils/cookies'
import Card from '@/components/card/card'
import { getSearchHistory } from '@/utils/searchHistory'

export default function Wishlist() {
    const router = useRouter()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        setCourses(getSearchHistory().reverse())
    }, [])

    return (
        <div>
            <Layout />
            <div className='container m-auto mt-7'>
                <div className='text-3xl font-semibold mb-4'>History</div>
                <div className='grid gap-4' style={{gridTemplateColumns: 'repeat(auto-fill,minmax(15rem,1fr))', rowGap: '2rem', columnGap: '2rem'}}>
                    {
                        courses?.length === 0 ?
                        <div className='text-lg text-light'>No courses in your search history</div> :
                        courses?.map((course) => (
                            <Card course={course.course} key={course._id} />
                        ))
                    }
                </div>
                <div>
                    <button onClick={() => {
                        localStorage.removeItem('searchHistory')
                        setCourses([])
                    }} className='border-red-400 border-2 text-red-400 p-2 rounded-lg mt-10 mb-10'>Clear History</button>
                </div>
            </div>
        </div>
    )
}
