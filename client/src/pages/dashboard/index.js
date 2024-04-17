import React, {useEffect, useState} from "react";
import Card from "@/components/card/card";
import Layout from "@/components/layout/layout";
import { getUserFromJWT } from "@/utils/cookies";
import { useRouter } from "next/router";

export default function Home() {
    const [courses, setCourses] = useState([])
    const [user, setUser] = useState({})

    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return

        const user = getUserFromJWT().then((data) => {
            setUser(data)
            if (!data?._id) {
                router.push('/login')
            }
    
            fetch(`http://localhost:3001/courses?q=`)
            .then(res => res.json())
            .then(data => {
                setCourses(data.filter((item) => item.author_id == user._id))
            })
        })
    }, [router.isReady])

    return (
        <div>
            <Layout />
            <div className='text-3xl font-semibold container m-auto pt-8'>Welcome to Author's Dashboard</div>
            <div className="container m-auto">
                <div className="mt-4 text-lg text-emerald-700 cursor-pointer" onClick={() => {router.push('/create_course')}}>
                    + Create New Course
                </div>
            </div>
            <div className="grid gap-4 container m-auto mt-7 flex-wrap m-4 pb-10" style={{gridTemplateColumns: 'repeat(auto-fill,minmax(15rem,1fr))', rowGap: '2rem', columnGap: '2rem'}}> 
                {
                    courses.length > 0 ? 
                    courses.map(course => (
                    <Card course={course} key={course._id} />
                    )) :
                    <div className="text-xl font-normal w-full">You didn't create any course yet</div>
                }
            </div>
        </div>
    );
}