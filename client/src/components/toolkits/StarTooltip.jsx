function StarTooltip({ descriptionStar, emoji }) {
    return (
        <div
            className="absolute bg-white text-black text-xs 
        text-center bottom-0 translate-y-9 shadow-model-1 right-1/2 translate-x-1/2
        px-1 py-1.5 w-24 rounded-md font-medium"
        >
            {emoji} {descriptionStar}
        </div>
    );
}

export default StarTooltip;
