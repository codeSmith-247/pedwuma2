
import { Link } from "react-router-dom";
import { Btn, Cards } from "components";


export default function () {
    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <h1 className="orb font-semibold">Service Categories</h1>

                <Link to="/admin/category/new">
                    <Btn.SmallBtn>New Category</Btn.SmallBtn>
                </Link>
            </div>

            <div className="grid-box-fit gap-3" style={{"--width": '250px'}}>
                {Array.from({length: 20}, (item, index) => 
                    <Cards.Description
                        key={index}
                        title={"Carpenter"}
                        description={<div className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, 
                        amet aperiam nostrum impedit nobis aut? Minima perferendis quidem cupiditate rerum!</div>}
                        btnText="See Workers"
                        className="h-[400px] max-[1165px]:w-[300px] max-[1165px]:h-[400px] border border-gray-200 shadow-xs hover:shadow-lg bg-white rounded-md overflow-hidden relative group"
                    />
                )}
            </div>

            
        </section>
    );
}