import { useRouter } from "next/router";
import { useState } from "react";
import { setCookie, unsetCookie } from "@/utils/cookies";

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setError(null);
        if (email.length == 0 || password.length == 0){
            setError('Please fill out all the fields!')
            return
        }
        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        console.log(result)
        if (response.status == 400 || response.status == 404) {
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
    };

    return (
        <div className="flex justify-center h-screen place-items-center">
            <div className="relative">
                <button className="absolute top-4 left-4 z-10" onClick={() =>{router.push("/")}}>
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
                    <div className="flex-grow  p-4 flex items-center">
                        <div className=" flex justify-center  items-center flex-col flex-wrap  w-full">
                            <h1 className=" font-bold text-3xl text-center mb-8 ">
                                Login 📚
                            </h1>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered  w-2/3 mb-8  rounded-full"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-2/3 mb-8 rounded-full"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <button
                                className="bg-emerald-700 py-3 block w-2/3 rounded-full mb-4 text-white"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                            {error && (<h1 className="text-error mb-4">{error}</h1>)}
                            <h1>Do not have an account yet? <a href="/signup" className="link text-emerald-700">Sign Up!</a></h1>
                        </div>
                    </div>
                    <div>
                        <div
                            className="hero w-80 h-full rounded-3xl"
                            style={{
                                backgroundImage: "url(loginbg.png)",
                            }}
                        >
                            <div className="hero-overlay bg-opacity-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
