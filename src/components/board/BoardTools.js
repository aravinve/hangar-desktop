function BoardTools({loading, colors, activeColor, modifyActiveColor, refreshColors, clearCanvas, handleLineWidth, lineWidth}) {
    return (
        <>
            <div className="flex flex-row mt-2 mb-4 items-center justify-center">
                {!loading ? (<div className="flex-1 flex flex-row justify-center">
                {colors && colors.map(color => (
                    <div key={color} className={color === activeColor ? `w-10 h-10 border mx-0.5 b-4 border-black cursor-pointer` : `w-8 h-8 border mx-0.5 b-1 border-black cursor-pointer`} style={{backgroundColor: `${color}`}} onClick={() => modifyActiveColor(color)}>
                        &nbsp;
                    </div>
                    ))}
               </div>): (<div className="flex-1 flex flex-row justify-center">
                   <div className="text-primary text-xl">
                       Loading Pallete....
                   </div>
               </div>) }
               <div className="flex-shrink-0 flex flex-row justify-end">
                    <div className="mx-2 px-2 py-1 inline-flex items-center justify-center">
                        <i className="fas fa-paint-brush mx-1 text-primary"></i>
                       <input type="range" className="slider" value={lineWidth} min={1} max={16} onChange={handleLineWidth} onMouseMove={(e) => {
                           const element = e.target
                           element.style.background = `linear-gradient(90deg, #172b4d ${Math.ceil((lineWidth/16) * 100)}%, #f2f2f2 ${Math.ceil((lineWidth/16) * 100)}%)`
                       }} /> <span className="mx-1 text-md text-primary">{lineWidth}</span>
                   </div>
                   <div className="mx-2 cursor-pointer text-secondary text-xl px-2 py-1 bg-primary" onClick={refreshColors}>
                       <i className="fas fa-palette"></i>
                   </div>
                   <div className="mr-6 ml-2 cursor-pointer text-secondary text-xl px-2 py-1 bg-primary" onClick={clearCanvas}>
                       <i className="fas fa-ban"></i>
                   </div>
               </div>
            </div>
        </>
    )
}

export default BoardTools
