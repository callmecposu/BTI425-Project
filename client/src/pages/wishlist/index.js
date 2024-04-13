import React, {useState, useEffect} from 'react'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import { getUserFromJWT } from '@/utils/cookies'
import Card from '@/components/card/card'

export default function Wishlist() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        getUserFromJWT().then(data => {
            if (!data) {
                router.push('/login')
            }
            setIsLoggedIn(true);
            setUser(data);
        })
    }, [])

    const getCourse = async (id) => {
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

        const json = await fetch(`http://localhost:3001/course/${id}`, {
            headers: headers
        })
        const data = await json.json()
        return data
    }

    useEffect(() => {
        if (user) {
            setCourses([])
            user.wishlist.forEach(async (course_id) => {
                const course = await getCourse(course_id)
                setCourses(cur => {
                    if (!cur.some(c => c._id === course?.course._id)) {
                        return [...cur, course?.course]
                    }
                    return cur
                })
            })
        }
    }, [user])

    return (
        <div>
            <Layout />
            <div className='container m-auto mt-7'>
                <div className='text-3xl font-semibold mb-4'>Wishlist</div>
                <div className='grid gap-4' style={{gridTemplateColumns: 'repeat(auto-fill,minmax(15rem,1fr))', rowGap: '2rem', columnGap: '2rem'}}>
                    {
                        courses?.length === 0 ?
                        <div className='text-lg text-light mb-10'>No courses in your wishlist</div> :
                        courses?.map((course) => (
                            <Card course={course} key={course._id} wishlist={true} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
