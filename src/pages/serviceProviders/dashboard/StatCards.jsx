

import { Cards } from "components";
import { paddNumber } from "functions/utils/Fixers";
import { useTotal, useTotalUserType } from "functions/reads/General";
import { useTotalJobsByStatus, useTotalApplications } from "functions/reads/Jobs";
import { useTotalBookings } from "functions/reads/Bookings";



export default function () {

    const stats = [
        {
            name: 'Total Jobs',
            icon: 'box',
            value: useTotalJobsByStatus("Accepted"),

        },
        {
            name: 'Total Bookings',
            icon: 'tag',
            value: useTotalBookings(),

        },
        {
            name: 'Pending Jobs',
            icon: 'person-workspace',
            value: useTotalJobsByStatus("Applied"),

        },
                {
            name: 'Total Applications',
            icon: 'people',
            value: useTotalApplications(),

        },
    ]

    return (
        <div className="summary grid-box-fit gap-4 my-3" style={{"--width": "230px"}}>

            {stats.map( (item, index) => {
                    return <Cards.Stat key={index} title={item?.name} icon={item?.icon} value={paddNumber(item?.value?.data)} loading={ item?.value?.isLoading || item?.value?.isError } />
                }
            )}

        </div>
    );
}