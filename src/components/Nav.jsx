import { useState } from 'react';
import { SmallBtn } from "./Buttons";

export default function () {
    const [ menu, setMenu ] = useState(false);
    return (
        <div className="">
            <div className="relative z-20">
                <nav className="bg-black text-white px-10 py-3 max-[475px]:px-5 flex items-center justify-between relative z-20">
                    <div className="logo flex items-center gap-2">
                        <div className="image h-[40px] w-[40px] rounded-full overflow-hidden bg-blue-800">
                            <img src="/images/logo.png" className="object-cover h-full w-full" />
                        </div>
                        <div className="uppercase orb font-black">pedwuma</div>
                    </div>

                    <div className="flex items-center">

                        <div className="px-3 py-1.5 mx-1 hover:bg-[#222] bg-opacity-30 rounded text-sm max-[1165px]:hidden">Our Workers</div>
                        <div className="px-3 py-1.5 mx-1 hover:bg-[#222] bg-opacity-30 rounded text-sm max-[1165px]:hidden">Our Jobs</div>
                        <div className="px-3 py-1.5 mx-1 hover:bg-[#222] bg-opacity-30 rounded text-sm max-[1165px]:hidden">Service Categories</div>
                        <div className="px-3 py-1.5 mx-1 mr-3 hover:bg-[#222] bg-opacity-30 rounded text-sm max-[1165px]:hidden">Log In</div>

                        <SmallBtn>
                            Sign Up
                        </SmallBtn>

                        <i onClick={() => setMenu(!menu)} className={`bi bi-${menu ? 'x-lg' : 'list'} font-black text-3xl ml-6 max-[475px]:ml-3 max-[475px]:text-xl`}></i>

                    </div>
                </nav>

                <div className={`mobile-menu ${ menu ? 'top-12 mt-4' : '-top-[200vh]'} shadow-lg left-0 w-full bg-white absolute z-10 `}>
                    <div className="text-2xl hover:tracking-wide hover:bg-gray-200 py-5 px-10 max-[475px]:p-5">Our Workers</div>
                    <div className="text-2xl hover:tracking-wide hover:bg-gray-200 py-5 px-10 max-[475px]:p-5">Our Jobs</div>
                    <div className="text-2xl hover:tracking-wide hover:bg-gray-200 py-5 px-10 max-[475px]:p-5">Service Categories</div>
                    <div className="text-2xl hover:tracking-wide hover:bg-gray-200 py-5 px-10 max-[475px]:p-5">Log In</div>
                </div>
            </div>

            <div className="absolute bottom-[15%] right-1 p-5 z-0">
                <div className="h-[45px] w-[140px] border-2 active:border-black hover:border-blue-600 shadow mb-3 relative group bg-black px-3 rounded-md">
                    <img src="/images/playstore.jpg" className="object-contain h-full w-full rounded-md" />
                </div>
                <div className="h-[45px] w-[140px] border-2 active:border-black hover:border-blue-600 shadow mb-3 relative group bg-black px-3 rounded-md">
                    <img src="/images/appstore.png" className="object-contain h-full w-full rounded-md" />
                </div>
            </div>
        </div>
    );
}