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
import { useRouter } from "next/router";
import { useState } from "react";
import { setCookie, unsetCookie } from "@/utils/cookies";


const Signup = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSignUp = async () => {
        setError(null)

        if (username.length == 0 || password.length == 0 || confirmPassword.length == 0 || email.length == 0) {
            setError('Please fill out all the fields!')
            return
        }
        if (password != confirmPassword) {
            setError("Password do not match!")
            return
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            setError('Invalid email address');
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:3001/create_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ email: email, name: username, password: password }),
        });
        const result = await response.json();
        console.log(result)
        if (response.status == 400) {
            setError(result.message);
            unsetCookie("jwt");
            return;
        }
        if (response.status != 200) {
            setError("An Error Occured");
            unsetCookie("jwt");
            return;
        }
        const allHeaders = response.headers.entries();
        for (const header of allHeaders) {
            console.log(header[0], ":", header[1]);
        }
        setCookie(
            "jwt",
            result.token,
            60 * 60 * 24 * 3
        );
        router.push('/')

    }

    return (
        <div className="flex justify-center h-screen place-items-center">
            <div className="relative">
                <button className="absolute top-4 right-4 z-10" onClick={() => { router.push("/") }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-zinc-600 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </button>
                <div className="flex login-container shadow-2xl bg-neutral rounded-3xl">
                    <div>
                        <div
                            className="hero w-80 h-full rounded-3xl"
                            style={{
                                backgroundImage:
                                    "url(loginbg.png)",
                            }}
                        >
                            <div className="hero-overlay bg-opacity-10"></div>
                        </div>
                    </div>
                    <div className="flex-grow  p-4 flex items-center ">

                        <div className=" flex justify-center  items-center flex-col flex-wrap  w-full">
                            <h1 className=" font-bold text-3xl text-center mb-8 ">Sign Up 🎓</h1>
                            <input type="email" placeholder="Email" className="input input-bordered  w-2/3 mb-8  rounded-full " onChange={(e) => { setEmail(e.target.value) }} value={email} />

                            <input type="text" placeholder="Name" className="input input-bordered  w-2/3 mb-8  rounded-full " onChange={(e) => { setUsername(e.target.value) }} value={username} />

                            <input type="password" placeholder="Password" className="input input-bordered  w-2/3 mb-8 rounded-full" onChange={(e) => { setPassword(e.target.value) }} value={password} />

                            <input type="password" placeholder="Confirm Password" className="input input-bordered  w-2/3 mb-8 rounded-full" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />

                            <button className="py-3 bg-emerald-700 text-white block w-2/3 rounded-full mb-4 " onClick={handleSignUp}>Sign Up</button>

                            {error && (<h1 className="text-error mb-4">{error}</h1>)}

                            <h1>Have an account already? <a href="/login" className="link text-emerald-700 ">Login!</a></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;