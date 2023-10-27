
import { Skeleton } from "@mui/material";
import { Btn, EmptyBox, Cards } from "components";
import { Link, useNavigate } from "react-router-dom";

import { useBookingProfiles } from "functions/reads/Bookings";

import { encrypt } from "functions/utils/Fixers";

export default function () {

    const { data, isLoading, isError } = useBookingProfiles();

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h1 className="orb font-semibold mb-3">Profiles</h1>
                <Link to={"/admin/profile/new"}>
                    <Btn.SmallBtn>New Profile</Btn.SmallBtn>
                </Link>
            </div>

            <div className="profiles flex grid-box-fill gap-3" style={{"--width": "250px"}}>
                {(isLoading || isError ) && Array.from({length: 15}, (item, index) => 
                    <Cards.Profile key={index} item={item} loading={true} />
                )}
                
                { data && data[0].map( (item, index) => 
                    <Cards.Profile onBtnClick={(() => navigate(`/admin/profile/edit/${encrypt(item.id)}`))} key={index} item={item}  />
                )}

            </div>

            <EmptyBox load={typeof(data) != 'undefined' && data[0]?.length <= 0} image={"/images/profile.png"} title="No Booking Profiles " text="plese click the new profile button ath the top right corner of the page to create a profile"/>

        </div>
    );
}