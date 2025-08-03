import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    // For debugging: toggle user state to test both branches
    const [user] = useState(true); // setUser is unused, so remove it to fix lint error

    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between py-4 ">
            <Link to="/">
                <img src={assets.logo} alt="main-logo" className="w-28 sm:w-32 lg:w-40" />
            </Link>
 
            <div>
                {user ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duraion-700">
                            <img src={assets.credit_star} alt="credit-star"/>
                            <p className="text-xs sm:text-sm font-medium text-gray-600">Credits left : 50</p>
                        </button>
                        <p className="text-gray-600 max-sm:hidden pl-4">Hi, Afzal</p>
                        <div className="relative group">
                            <img src={assets.profile_icon} className="w-10 drop-shadow" alt="profile"/>
                            {/* Fix: group-hover:block (no space) */}
                            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded py-12">
                                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm ">
                                    <li className="py-0 px-3 cursor-pointer">logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 sm:gap-5 ">
                        <p
                            onClick={() => navigate('/buy')}
                            className="cursor-pointer"
                        >
                            Pricing
                        </p>
                        <button className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full">
                            login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}