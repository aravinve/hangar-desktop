import {useState, useEffect} from 'react'
import Dashboard from '../home/Dashboard'
import BoardName from './BoardName'
import BoardCanvas from './BoardCanvas'
import hangarFetch from '../../HangarFetch'
import BoardTools from './BoardTools'

function Board() {

  const generateCoolColors = () => {
    return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
  }

  const [baseColor, setBaseColor] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeColor, setActiveColor] = useState(null)
  const [[windowWidth, windowHeight], setWindowSize] = useState(([
    window.innerWidth,
    window.innerHeight
  ]))
  const [visible, setVisible] = useState(false)
  const [clearCanvas, setClearCanvas] = useState(false)
  const [downloadCanvas, setDownloadCanvas] = useState({
    download: false,
    fileName: null
  })
  const [lineWidth, setLineWidth] = useState(8)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timeoutId
    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
      setVisible(true)
      timeoutId = setTimeout(() => setVisible(false), 500)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeoutId)
    }
  })
  
  const getColors = async (baseColor) => {
    const colorsData = await hangarFetch(`colors-${baseColor}`, `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
    await setColors(colorsData.colors.map((color) => color.hex.value))
    await setActiveColor(colorsData.colors[0].hex.value)
    setLoading(false)
  }

  const refreshColors = async () => {
    setLoading(true)
    const randomColor = generateCoolColors()
    setBaseColor(randomColor)
    await getColors(randomColor.slice(1))
  }

  useEffect(() => {
   refreshColors()
  }, [])

  const modifyActiveColor = (changedColor) => {
    setActiveColor(changedColor)
  }

  const clearCanvasDrawing = () => {
    setClearCanvas(true)
  }

  const handleLineWidth = (e) => {
    setLineWidth(e.target.value)
  }

  const downloadCanvasDrawing = (fileName) => {
    setDownloadCanvas({
      download: true,
      fileName: fileName
    })
  }

  return (
    <>
        <div
          className='text-center flex flex-col justify-center' style={{borderTop: `10px solid ${baseColor}`}}>
            <BoardName downloadCanvas={downloadCanvasDrawing} />
            <BoardTools loading={loading} colors={colors} activeColor={activeColor} modifyActiveColor={modifyActiveColor} refreshColors={refreshColors} clearCanvas={clearCanvasDrawing} handleLineWidth={handleLineWidth} lineWidth={lineWidth} />
            {activeColor && (<div className='flex flex-row px-6'>
              <BoardCanvas color={activeColor} canvasHeight={windowHeight} canvasWidth={windowWidth} lineWidth={lineWidth} clearCanvas={clearCanvas} setClearCanvas={setClearCanvas} downloadCanvas={downloadCanvas} setDownloadCanvas={setDownloadCanvas} />   
           </div>)}
           {visible ? ( <div className="flex flex-row justify-center text-primary text-xl">
            {`${windowWidth} x ${windowHeight}`}
            </div>) : null}
               
        </div>
        <Dashboard />
      </>
  )
}

export default Board
