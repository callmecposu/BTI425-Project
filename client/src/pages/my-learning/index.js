/****************************************************************************** 
 * BTI425 – Project
 * 
 * I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Group member Name: Vladyslav Huziienko, Maksym Volkovynskyi 
 * Student IDs: 180749210, 126867225
 * Date: 18 April 2024
*****************************************************************************/
import React, {useState, useEffect} from 'react'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import { getUserFromJWT } from '@/utils/cookies'
import Card from '@/components/card/card'

export default function MyLearning() {
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

        const json = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/${id}`, {
            headers: headers
        })
        const data = await json.json()
        return data
    }

    useEffect(() => {
        if (user) {
            setCourses([])
            user.purchased_courses.forEach(async (course_id) => {
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
            <div className='container m-auto mt-7 pb-10'>
                <div className='text-3xl font-semibold mb-4'>My Learning</div>
                <div className='grid gap-4' style={{gridTemplateColumns: 'repeat(auto-fill,minmax(15rem,1fr))', rowGap: '2rem', columnGap: '2rem'}}>
                    {
                        courses?.length === 0 ?
                        <div className='text-lg text-light mb-10'>You don't have any purchased courses</div> :
                        courses?.map((course) => (
                            <Card course={course} key={course._id} wishlist={true} purchased={true} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
