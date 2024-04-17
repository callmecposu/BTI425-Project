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
    const [lectures, setLectures] = useState([]);
    const [lectureTitle, setLectureTitle] = useState('');
    const [lectureContent, setLectureContent] = useState('');
    const [lectureError, setLectureError] = useState('');
    const [mode, setMode] = useState('create');
    const [editLectureId, setEditLectureId] = useState(null);

    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        const user = getUserFromJWT().then((data) => {
            setUser(data);
            if (!data?._id) {
                router.push("/login");
            }
        });
    }, [router.isReady]);

    useEffect(() => {
        if (!user?._id) return;
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
        
        fetch(`http://localhost:3001/course/${id}`, {
            headers: headers
        })
        .then(res => res.json())
        .then(data => {
            if(data.author.id != user._id) {
                router.push('/dashboard')
            }
            else {
                setCourseData({
                    title: data.course.title,
                    description: data.course.description,
                    price: data.course.price,
                    learningOutcomes: data.course.learning_outcomes
                })
                setLectures(data.lectures)
            }
        })
    }, [user])  

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
        
        let submitData = Object.assign({}, courseData);
        submitData.learning_outcomes = submitData.learningOutcomes.filter(outcome => outcome.length > 0);
        delete submitData.learningOutcomes;
        submitData.price = price;

        const jwt = document.cookie.split(';').find(cookie => cookie.includes('jwt'))

        console.log('submitData', submitData)   
        fetch('http://localhost:3001/update_course/'+id, {
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
        })
    };

    const upload_lecture = () => {
        if(lectureTitle.length < 5) {
            setLectureError('Title must be at least 5 characters long');
            return;
        }
        if(lectureContent.length < 20) {
            setLectureError('Content must be at least 20 characters long');
            return;
        }
        setLectureError(null);

        const jwtCookie = document.cookie
            ?.split(';')
            ?.find(cookie => cookie.trim().startsWith('jwt='));
        const jwtValue = jwtCookie?.split('=')[1];
        fetch(mode === 'create' ? `http://localhost:3001/create_lecture` : `http://localhost:3001/update_lecture/${editLectureId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtValue,
            },
            body: JSON.stringify({title: lectureTitle, content: lectureContent, course_id: id})
        })
        .then(res => res.json())
        .then(data => {
            if(mode === 'create')
                setLectures(lec => [...lec, data]);
            else
                setLectures(lec => lec.map(lecture => lecture._id === editLectureId ? data : lecture));
            setLectureTitle('');
            setLectureContent('');
        })

        setMode('create');
        setEditLectureId(null);
    }

    const populateLecture = (title, content) => {
        setLectureTitle(title);
        setLectureContent(content);
    }

    const removeLecture = (id) => {
        const jwtCookie = document.cookie
            ?.split(';')
            ?.find(cookie => cookie.trim().startsWith('jwt='));
        const jwtValue = jwtCookie?.split('=')[1];   

        fetch(`http://localhost:3001/delete_lecture/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + jwtValue
            }
        }).then((res) => {
            setLectures(lec => lec.filter(lecture => lecture._id !== id));
        
        })
    }

    return (
        <div>
            <Layout />
            <div className="text-3xl font-semibold container m-auto pt-8">
                Course Details
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
                <button type="submit" className="text-emerald-700 border-2 border-emerald-700 mt-2 mb-6 rounded-md p-2">Update Course</button>
                {error && <div className="text-red-600 pb-6">{error}</div>}
            </form>
            <div className="text-3xl font-semibold container m-auto pt-8">
                Create Materials
            </div>
            <div className="container m-auto my-2">
                {
                    lectures.length > 0 ?
                    lectures.map((lecture, index) => (
                        <div key={lecture._id} className="flex py-2 justify-between">
                            <div className="flex items-center gap-2">
                                <div className="text-emerald-700 h-5 w-5 leading-5 text-center">{index+1}.</div>
                                {lecture.title}
                            </div>
                            <div className="flex gap-2 text-lg">
                                <div className="text-white bg-emerald-700 rounded-full p-2 text-sm cursor-pointer" onClick={() => {populateLecture(lecture.title, lecture.content);setMode('update');setEditLectureId(lecture._id)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5L2 22l1.5-5.5Zm-2 2l4 4"/></svg>
                                </div>
                                <div className="text-white bg-red-400 rounded-full p-2 text-sm cursor-pointer" onClick={() => {removeLecture(lecture._id)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M3.38 9.085a1 1 0 0 0 .997.915h3.246a1 1 0 0 0 .996-.915L9.055 4h-6.11z"/></svg>
                                </div>
                            </div>
                        </div>
                    )) :
                    <div className="my-4 text-zinc-400 text-lg">
                        No lectures yet
                    </div>
                }
            </div>
            <div className="container m-auto">
                <hr />
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Enter lecture title" 
                    className="mt-4 border-2 block mt-2 rounded-md p-2 w-full mb-4" 
                    value={lectureTitle} 
                    onChange={(e) => setLectureTitle(e.target.value)} 
                />
                <textarea 
                    id="content" 
                    name="content" 
                    placeholder="Enter lecture content" 
                    className="border-2 block mt-2 rounded-md p-2 w-full mb-4" 
                    value={lectureContent}
                    onChange={(e) => setLectureContent(e.target.value)}
                ></textarea>
                <button onClick={() => upload_lecture()} className="text-emerald-700 border-2 border-emerald-700 mt-2 mb-6 rounded-md p-2">{mode === 'create' ? 'Add' : 'Edit'} Lecture</button>
                {mode === 'update' && <button onClick={() => {setMode('create');setLectureTitle('');setLectureContent('')}} className="text-red-400 border-2 border-red-400 mt-2 mb-6 rounded-md p-2 ml-2">Clear</button>}
                {lectureError && <div className="text-red-600 pb-6">{lectureError}</div>}
            </div>
        </div>
    );
}