import React, {useState, useEffect} from 'react'
import { getUserFromJWT } from '@/utils/cookies'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'

export default function Learning() {
    const router = useRouter()
    const { id } = router.query
    const [course, setCourse] = useState(null)
    const [user, setUser] = useState(null)
    const [currentLecture, setCurrentLecture] = useState(0)

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
        else {
            router.push('/login')
        }

        getUserFromJWT().then(data => {
            setUser(data);
            console.log(data)
            if(!data?.purchased_courses?.includes(id)) {
                router.push('/buy/'+id)
            }
        })

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/${id}`, {
            headers: headers
        })
        .then(res => res.json())
        .then(data => {
            setCourse(data)
            setCurrentLecture(data?.lectures[0]?._id)
        })
    }, [router.isReady])

    return (
        <div className='h-screen'>
            <Layout />
            <div className='shadow-[0_15px_60px_-25px_rgba(0,0,0,0.4)] rounded-xl w-7/8 m-8 bg-white flex justify-between container mx-auto'>
                <div style={{width: '75%'}} className='p-4'>
                    {
                        course?.lectures?.map(lecture => {
                            if(lecture._id == currentLecture) {
                                return (
                                    <div key={lecture._id}>
                                        <h1 className='text-xl mb-4 font-semibold'>{lecture.title}</h1>
                                        <div style={{whiteSpace: 'pre-wrap'}}>
                                            {
                                                lecture?.content
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className='p-4 flex flex-col gap-4 border-l-2 mr-2' style={{width: '25%'}}>
                    <h1 className='text-xl'>Lectures</h1>
                    {
                        course?.lectures?.map(lecture => {
                            return (
                                <div className='flex justify-between cursor-pointer' key={lecture?._id} onClick={() => {setCurrentLecture(lecture?._id)}}>
                                    <h1 style={currentLecture == lecture?._id ? {fontWeight: 'bold'} : {}}>{lecture.title}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
