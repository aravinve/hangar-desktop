import React, {useState} from 'react'

function BoardName({downloadCanvas}) {
    const [name, setName] = useState('')
    return (
        <div className='flex flex-row justify-center items-center'>
            <div className="flex-1 flex flex-row mt-4 mb-2 px-4">
                <div className='text-primary text-xl w-full'>
                    <input type="text" value={name} 
                    className="rounded-md shadow-md px-6 text-xl text-primary outline-none focus:outline-none w-full capitalize" onChange={(e) => setName(e.target.value)} onClick={(e) => e.target.setSelectionRange(0,e.target.value.length)} placeholder="Untitled" />
                </div>
            </div>
            <div className="flex-shrink-0 mt-4 mb-2">
                <button className='rounded-sm shadow-sm bg-primary text-secondary outline-none focus:outline-none mx-2 py-1 px-2' onClick={() => {
                    if(name === ''){
                        setName('Untitled')
                        downloadCanvas('Untitled')
                    } else {
                        downloadCanvas(name.charAt(0).toUpperCase().concat(name.slice(1)))
                    }
                }}>
                <i className="fas fa-download mx-1"></i> Download
                </button>
            </div>
        </div>
    )
}

export default BoardName
