import React from "react";

const Navbar = ()=>{
    return(
        <nav className="flex justify-between my-4 py-3 bg-stone-700 text-white py">
           
           <div className="logo">
            <span className="font-bold text-xl mx-9"> logo ha yrr!!!</span>
                </div>
            <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer hover:font-bold transition-all">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all">Your task</li>
            </ul>
        </nav>
    )
}
export default Navbar