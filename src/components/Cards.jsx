




export function StatCard({ title, value, icon}) {
    return (
        <div className="rounded w-[200px] border border-black shadow hover:shadow-lg p-5 py-2.5 flex items-center hover:bg-blue-50 bg-opacity-10">
            <div className="flex-grow">
                <div className="title orb">{title}</div>
                <div className="orb text-xl py-2 font-semibold">{value}</div>
            </div>

            <i className={`bi bi-${icon} text-2xl h-[50px] w-[50px] border border-black rounded-full flex items-center justify-center`}></i>
        </div>
    );
}