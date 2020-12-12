
function StickyCard({data, displayNote}) {
    return (
        <div className="w-48 h-24 bg-white p-2 flex flex-col justify-start overflow-hidden overflow-ellipsis cursor-pointer select-none m-1 shadow-md" id={data.id.toString().concat("gist")} onClick={() => displayNote(data.id)}>
            <div className="flex-auto text-xs text-black">
                {data.time}
            </div>
            <div className="flex-auto text-lg text-primary mb-1">
                {data.title}
            </div>
            <div className="flex-auto text-xs text-black p-0.5">
                {data.content}
            </div>
        </div>
    )
}

export default StickyCard
