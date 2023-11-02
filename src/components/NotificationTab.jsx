
import { ImageCircle } from "components";




export default function ({active=false, extraClass="", ...props}) {
    return (
        <div className={` ${active ? "bg-blue-700 text-white" : "bg-white"} ${extraClass}  group hover:bg-blue-500 active:bg-blue-600 hover:text-white shadow-md px-5 py-3 scale-95`} {...props}>
            <div className="flex gap-3 items-center">
                <ImageCircle image={"/images/logo.png"} extraClass=" h-[40px] w-[40px]"/>
                <div className="details flex-grow" style={{width: "calc(100% - 50px)"}}>
                    <div className="flex items-center justify-between">
                        <div className="name font-semibold orb">David Shalom</div>
                        <span className={`${active ? "text-gray-200 " : "text-gray-500"}  group-hover:text-gray-200 text-xs`}>7:30</span>
                    </div>
                </div>
            </div>
            
            <p className={`${active ? "text-gray-200 " : "text-gray-700"} text-sm  group-hover:text-gray-100 my-1`}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam molestiae u
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam molestiae u
            </p>
        </div>
    )
}