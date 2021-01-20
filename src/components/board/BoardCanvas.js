import {useState, useEffect, useRef} from 'react'

function BoardCanvas({color, canvasHeight, canvasWidth, lineWidth, clearCanvas, setClearCanvas, downloadCanvas, setDownloadCanvas}) {

    const canvasRef = useRef()
    const ctx = useRef()
    const [drawing, setDrawing] = useState(false)

    const canvasStyle = {
        cursor: 'crosshair',
        height: '29rem'
    }

    useEffect(() => {
        ctx.current = canvasRef.current.getContext('2d')
    }, [])

    useEffect(() => {
        if(clearCanvas){
            clearCanvasDrawing()
        }
    }, [clearCanvas])

    useEffect(() => {
        if(downloadCanvas.download){
            downloadCanvasDrawing(downloadCanvas.fileName)
        }
    }, [downloadCanvas])

    const handleMouseMove = (e) => {
        const coords = [
          e.clientX - canvasRef.current.offsetLeft,
          e.clientY - canvasRef.current.offsetTop
        ]
        if (drawing) { 
          ctx.current.lineTo(...coords)
          ctx.current.stroke()
        }
      }

      const startDrawing = (e) => {
        ctx.current.lineJoin = 'round'
        ctx.current.lineCap = 'round'
        ctx.current.lineWidth = lineWidth !== null ? lineWidth : 8
        ctx.current.strokeStyle = color
        ctx.current.beginPath()
        ctx.current.moveTo(
          e.clientX - canvasRef.current.offsetLeft,
          e.clientY - canvasRef.current.offsetTop
        )
        setDrawing(true)
      }

      const stopDrawing = () => {
          ctx.current.closePath()
          setDrawing(false)
      }

      const clearCanvasDrawing = () => {
          ctx.current.clearRect(0, 0, canvasWidth, canvasHeight)
          setClearCanvas(false)
      }

      const downloadCanvasDrawing = (fileName) => {
            let link = document.createElement('a')
            link.download = `${fileName}.png`
            link.href = canvasRef.current.toDataURL()
            link.click()
            setDownloadCanvas(false)
      }

    return (
        <>
            <canvas
                className="border border-gray-600 b-2 w-full rounded-sm shadow-sm"
                style={canvasStyle}
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onMouseMove={handleMouseMove}
            />
        </>
    )
}

export default BoardCanvas