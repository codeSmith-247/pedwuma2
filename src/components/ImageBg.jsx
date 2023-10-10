

export default function({ image, classname="h-max", children, ...props}) {
    return (
        <div className={`${classname} relative`} {...props}>
            <div className="absolute top-0 left-0 h-full w-full z-0">
                <img src={image} className="object-cover h-full w-full" />
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}