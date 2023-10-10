
import { Btn } from "./";
import CardScroll from "./CardScroll";

export default function () {
    return (
        <CardScroll title='Our Best Workers'>
            {Array.from({length: 20}, (item, index) => 
                <div key={index} data-aos="fade-up" className="relative">
                    <div className="w-[500px] h-[250px] max-[1165px]:w-[300px] max-[1165px]:h-[500px] border border-gray-200 shadow-xs hover:shadow-lg bg-white rounded-md overflow-hidden relative grid grid-cols-10">
                        <div className="image col-span-4 max-[1165px]:col-span-10">
                            <img src="/images/pedwuma.jpg" className="object-cover h-full w-full " />
                        </div>
                        <div className="col-span-6 bg-white p-4 max-[1165px]:col-span-10">
                                <div className="text-gray-600 flex items-center gap-2 mb-1 text-xs">
                                    <i className="bi bi-geo-alt border rounded-full h-[20px] w-[20px] flex items-center justify-center"></i>
                                    <span className="" style={{width: 'calc(100% - 35px)'}}>Amasaman, Temah, Kumasi, Accra...</span>
                                </div>
                                <div className="title orb text-lg leading-none my-3">Adeniyi David Shalom</div>

                                <p className="text-xs mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur sint asperiores ipsum quae ipsa, ipsam natus inventore cupiditate! Ut...</p>

                                <div className="orb mb-3">
                                    <span className="orb">Ghc</span>
                                    <span className="orb text-lg">655</span>
                                </div>

                            <Btn.SmallBtn >Book Now</Btn.SmallBtn>
                        </div>
                    </div>
                    <div className="absolute -top-3 -right-3 h-[40px] w-[40px] border border-gray-200 rounded-full bg-white shadow">
                        <img src="/images/verify-badge.png" alt="" className="object-cover h-full w-full" />
                    </div>
                </div>
            )}
        </CardScroll>
    );
}