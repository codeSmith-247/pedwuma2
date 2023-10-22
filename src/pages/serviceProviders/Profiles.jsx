
import { Skeleton } from "@mui/material";
import { Btn, EmptyBox, Cards } from "components";
import { Link } from "react-router-dom";

import { useBookingProfiles } from "functions/reads/Bookings";

export default function () {

    const { data, isLoading, isError } = useBookingProfiles();

    console.log(data);

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h1 className="orb font-semibold mb-3">Profiles</h1>
                <Link to={"/admin/profile/new"}>
                    <Btn.SmallBtn>New Profile</Btn.SmallBtn>
                </Link>
            </div>

            <div className="profiles flex grid-box-fit gap-3" style={{"--width": "250px"}}>
                {(isLoading || isError ) && Array.from({length: 15}, (item, index) => 
                    <Cards.Profile key={index} item={item} loading={true} />
                )}
                
                { data && data[0].map( (item, index) => 
                    <Cards.Profile key={index} item={item} />
                )}

            </div>

            <EmptyBox load={typeof(data) != 'undefined' && data[0]?.length <= 0} image={"/images/profile.png"} title="No Booking Profiles " text="plese click the new profile button ath the top right corner of the page to create a profile"/>

        </div>
    );
}