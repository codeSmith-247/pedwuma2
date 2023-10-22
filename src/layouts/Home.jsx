import { Outlet } from "react-router-dom";

import { Nav, Footer } from "components";


export default function () {
    return (
        <main className="bg-whitesmoke">
            <Nav />
            <Outlet />
            <Footer />
        </main>
        
    )
}