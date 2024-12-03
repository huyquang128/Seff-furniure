function ActiveImgTooltip({ urlImgHover, colorIdActive }) {
    return (
        <div
            className="absolute h-32 w-28 p-1 rounded-lg bg-white 
                    flex flex-col items-center justify-center shadow-model-1 
                    bottom-10 gap-2 right-1/2 "
        >
            <img src={urlImgHover} alt="" className="h-20 rounded-md" />
            <div className="text-sm">{colorIdActive}</div>
        </div>
    );
}

export default ActiveImgTooltip;
