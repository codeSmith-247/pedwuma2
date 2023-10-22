
import { Btn } from "./";
import CardScroll from "./CardScroll";

export default function () {
    return (
        <CardScroll title='Worker Categories'>
            {Array.from({length: 20}, (item, index) => 
                <div key={index} className="w-[400px] h-[500px] max-[1165px]:w-[300px] max-[1165px]:h-[400px] border border-gray-200 shadow-xs hover:shadow-lg bg-white rounded-md overflow-hidden relative group">
                    <div className="image h-[70%] ">
                        <img src="/images/pedwuma.jpg" className="object-cover h-full w-full " />
                    </div>
                    <div className="absolute -bottom-[40px] max-[1165px]:-bottom-[0%] group-hover:bottom-0 max-[1165px]:group-hover:bottom-[40px] left-0 w-full bg-white">
                        <div className="p-5">
                            <div className="title orb text-xl mb-3">Carpenter</div>
                            <p className="text-sm max-[1165px]:text-xs">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, 
                                amet aperiam nostrum impedit nobis aut? Minima perferendis quidem cupiditate rerum!
                            </p>
                        </div>

                        <Btn.MediumBtn styles={{borderRadius: '0px', height: '40px', paddingTop: '1.25rem'}} fullWidth>See Workers</Btn.MediumBtn>
                    </div>

                    <div className="absolute top-1 left-1 p-2 bg-black bg-opacity-90 text-white rounded-md group-hover:bg-blue-600 orb"><span className="orb">123</span> workers</div>
                </div>
            )}
        </CardScroll>
    );
}