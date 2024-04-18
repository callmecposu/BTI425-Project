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
import React, {useEffect, useState} from "react";
import Card from "@/components/card/card";
import Layout from "@/components/layout/layout";

export default function Home() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses?q=${search}`)
      .then(res => res.json())
      .then(data => {
        setCourses(data)
      })
  }, [])

  return (
    <div>
      <Layout />
      <div className='text-3xl font-semibold container m-auto pt-8'>Explore Popular Courses</div>
      <div className="grid gap-4 container m-auto mt-7 flex-wrap m-4 pb-10" style={{gridTemplateColumns: 'repeat(auto-fill,minmax(15rem,1fr))', rowGap: '2rem', columnGap: '2rem'}}> 
        {courses.map(course => (
          <Card course={course} key={course._id} />
        ))}
      </div>
    </div>
  );
}