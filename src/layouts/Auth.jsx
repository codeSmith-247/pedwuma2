import { useState }     from "react";
import { Outlet, Link } from "react-router-dom";


export default function ({ links = [] }) {

    const [ menu , setMenu ] = useState(false);

    return (
        <main className={`dashboard absolute top-0 right-0 h-screen w-screen flex ${ menu ? 'active' : '' }`}>
            <div className="menu bg-blue-600 text-white h-screen overflow-y-scroll border-r border-gray-200">

                <Link to ="/">
                    <div className="image h-[40px] w-[40px] mx-auto mt-5 rounded-full overflow-hidden bg-blue-800">
                        <img src="/images/logo.png" className="object-cover h-full w-full" />
                    </div>

                    <div className="font-bold orb w-max mx-auto mb-5">PEDWUMA</div>
                </Link>

                <div className="links p-3">
                    {links.map((item, index) => 
                        <div key={index} className="border border-gray-200 px-1 py-2 my-2 rounded-md hover:bg-white hover:text-blue-600 ">
                            <i className={`bi bi-${item?.icon} mx-3`}></i>
                            <span>{item?.name}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="content-area h-screen">
                <div className="h-[60px] w-full shadow-md px-5 flex items-center justify-between">
                    <i onClick={() => setMenu(!menu)} className={`bi bi-list text-2xl`}></i>
                </div>

                <div className="overflow-y-scroll p-5" style={{ height: 'calc(100vh - 60px)'}}>
                    <Outlet />
                </div>
            </div>
        </main>
    );
    
}