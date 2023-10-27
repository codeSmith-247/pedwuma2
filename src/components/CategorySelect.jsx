
import { limit }   from "firebase/firestore";
import { useData } from "functions/reads/General";
import { Cards }   from "components";




export default function ({ back=null, selectCategory=()=>{}, title="Please Choose A Category For Your Profile" }) {

    const { data } = useData({
        target: "Category",
        conditions: [ limit(35) ],
    });

    return (
        <div>
            {back && 
                <i onClick={back} className="bi bi-chevron-left bg-blue-500 text-white h-[30px] w-[30px] rounded-md flex items-center justify-center"></i>
            }
            
            <h1 className="orb text-3xl text-center font-medium mx-auto my-6">{title}</h1>
    
            <div data-aos="fade-in" className="grid-box-fill gap-3 p-5" style={{"--width": '250px'}}>
                {!data && Array.from({length: 20}, (item, index) => 
                    <Cards.Loading />
                )}


                {data && data[0].map( (item, index) => 
                    <Cards.Description
                        key={index}

                        image={item["Pic"]}
                        title={item["Category Name"]}
                        description={<div className="text-xs">{item["Desc"].slice(0, 100)}...</div>}
                        topInfo=""
                        btnText="Choose Me"
                        onBtnClick={() => {selectCategory(item);}}
                        className="h-[320px] max-[1165px]:w-[300px] max-[1165px]:h-[320px] border border-gray-200 shadow-xs hover:shadow-lg bg-white rounded-md overflow-hidden relative group"
                    />
                )}
            </div>
        </div>

    );
}