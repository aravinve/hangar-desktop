
function StickyCard({data, displayNote, highlight}) {
    return (
        <div className="w-48 h-24 bg-body border-primary p-2 flex flex-col justify-start overflow-hidden overflow-ellipsis cursor-pointer select-none m-1 shadow-md" id={data.id.toString().concat("gist")} onClick={() => displayNote(data.id)}>
            <div className="flex-auto text-xs text-primary">
                {data.time}
            </div>
            <div className="flex-auto text-lg text-primary mb-1">
                {highlight.length > 0 && data.title.toLowerCase().includes(highlight) ? (<span className="bg-yellow-400">{data.title}</span>) : data.title}
            </div>
            <div className="flex-auto text-xs text-primary p-0.5">
            {highlight.length > 0 && data.content.toLowerCase().includes(highlight) ? (<span className="bg-yellow-400">{data.content}</span>) : data.content}
            </div>
        </div>
    )
}

export default StickyCard
