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
import { getUserFromJWT } from "@/utils/cookies";
import { useRouter } from "next/router";

export default function Home() {
    const [user, setUser] = useState({});
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        price: 0,
        learningOutcomes: [],
    });
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        const user = getUserFromJWT().then((data) => {
            setUser(data);
            if (!data?._id) {
                router.push("/login");
            }
        });
    }, [router.isReady]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOutcomeChange = (index, e) => {
        const { value } = e.target;
        setCourseData((prevData) => {
            const learningOutcomes = [...prevData.learningOutcomes];
            learningOutcomes[index] = value;
            return {
                ...prevData,
                learningOutcomes,
            };
        });
    };

    const handleAddOutcome = () => {
        setCourseData((prevData) => ({
            ...prevData,
            learningOutcomes: [...prevData.learningOutcomes, ""],
        }));
    };

    const handleRemoveOutcome = (index) => {
        setCourseData((prevData) => {
            const learningOutcomes = [...prevData.learningOutcomes];
            learningOutcomes.splice(index, 1);
            return {
                ...prevData,
                learningOutcomes,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(courseData.title.length < 5) {
            setError('Title must be at least 5 characters long');
            return;
        }
        if(courseData.description.length < 20) {
            setError('Description must be at least 20 characters long');
            return;
        }
        const price = parseFloat(courseData.price);
        if(isNaN(price) || price < 0) {
            setError('Price must be a positive number');
            return;
        }
        if(courseData.learningOutcomes.length < 1) {
            setError('At least 1 learning outcomes are required');
            return;
        }

        setError(null);
        
        const submitData = Object.assign({}, courseData);
        submitData.learning_outcomes = submitData.learningOutcomes.filter(outcome => outcome.length > 0);
        delete submitData.learningOutcomes;
        submitData.price = price;

        const jwt = document.cookie.split(';').find(cookie => cookie.includes('jwt'))

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create_course`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt.split('=')[1]}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('course', data)
            router.push('/edit_course/'+data._id)
        })
    };

    return (
        <div>
            <Layout />
            <div className="text-3xl font-semibold container m-auto pt-8">
                Create New Course
            </div>
            <form onSubmit={handleSubmit} className="container m-auto pt-8">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        className="border-2 block mt-2 rounded-md p-2 w-full mb-4"
                        placeholder="Enter course title"
                        type="text"
                        id="title"
                        name="title"
                        value={courseData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="border-2 block mt-2 rounded-md p-2 w-full mb-4"
                        placeholder="Enter course description"
                        id="description"
                        name="description"
                        value={courseData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        className="border-2 block mt-2 rounded-md p-2 w-full mb-4"
                        placeholder="Enter course price"
                        type="number"
                        id="price"
                        name="price"
                        value={courseData.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Learning Outcomes:</label>
                    {courseData.learningOutcomes.map((outcome, index) => (
                        <div key={index}>
                            <div className="relative">
                                <input
                                    className="border-2 block mt-2 rounded-md p-2 w-full mb-4"
                                    placeholder="Enter learning outcome"
                                    type="text"
                                    value={outcome}
                                    onChange={(e) => handleOutcomeChange(index, e)}
                                >
                                </input>
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveOutcome(index)} 
                                    className="rounded-full border-2 border-red-400 w-7 text-red-400 absolute right-2 top-0 mt-2"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddOutcome} className="text-emerald-700 block my-2">
                        + Add Outcome
                    </button>
                </div>
                <button type="submit" className="text-emerald-700 border-2 border-emerald-700 mt-2 mb-6 rounded-md p-2">Create Course</button>
                {error && <div className="text-red-600 pb-6">{error}</div>}
            </form>
        </div>
    );
}