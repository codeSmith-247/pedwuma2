import SideScroll from './SideScroll';

export default function () {
    return (
        <div className="px-10 max-[475px]:px-0">
            <div data-aos="fade-in" className="title mx-auto w-max flex items-center mb-3">
                <hr className="w-[100px] max-[800px]:w-[10px] h-0.5 bg-black"/>
                <div className="uppercase text-lg text-blue-600 font-semibold orb">Testimonials</div>
                <hr className="w-[100px] max-[800px]:w-[10px] h-0.5 bg-black"/>
            </div>
            
            <div data-aos="fade-in" className="text-center text-5xl max-[1165px]:text-3xl orb mb-12">
                What Our Customers Say
            </div>

            <SideScroll>
                {Array.from({length: 10}, (item, index) => 
                    <div key={index} data-aos="fade-up" className="">
                        <div className="w-[100px] h-[100px] rounded-full mx-auto shadow-lg relative top-7 overflow-hidden">
                            <img src="/images/pedwuma.jpg" alt="" className="h-full w-full object-cover" />
                        </div>
                        <p className="w-[450px] max-[1165px]:w-[310px] min-h-[150px] shadow-xl rounded p-5 pt-10 text-center max-[1165px]:text-sm">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse vitae tempore magni sunt ducimus quod nostrum quam in obcaecati officia autem aperiam, beatae voluptas nam laborum rem quia eligendi. Unde?
                        </p>
                    </div>
                )}
            </SideScroll>
        </div>
    );
}