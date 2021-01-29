import {useState} from 'react'
import SidebarItem from './SidebarItem'


function Sidebar({selectedNoteIndex, selectNote, newNote, deleteNote, notes }) {
    const [addingNote, setAddingNote] = useState(false)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)

    const openNewNote = () => {
        setTitle(null)
        setContent(null)
        setAddingNote(!addingNote)
    }

    const callNewNote = () => {
        if(title !== null && content !== null){
            newNote(title, content)
            setTitle(null)
            setContent(null)
            setAddingNote(!addingNote)
        }
    }

    const updateTitle = (val) => {
        setTitle(val)
    }

    const updateContent = (val) => {
        setContent(val)
    }

    const selectNoteFunction = (note, index) => {
        selectNote(note, index)
    }

    const deleteNoteFunction = (note) => {
        deleteNote(note)
    }

    const notesList = notes !== null && notes.length > 0 ? notes.map((note, index) => (
        <div key={index} className='bg-body text-primary border-primary rounded-sm shadow-sm p-2 m-2'>
            <SidebarItem note={note} index={index} selectedNoteIndex={selectedNoteIndex} selectNote={selectNoteFunction} deleteNote={deleteNoteFunction} />
        </div>
    )) : null

    return (
        <>
            <div className="bg-secondary flex-1 flex flex-col border-r border-primary justify-center p-2 mb-16">
                <div className="flex-shrink-0 inline-flex flex-row rounded-l-sm shadow-md bg-primary w-full">
                    <p className='bg-primary w-3/4 p-2 rounded-l-sm inline-flex items-center text-secondary text-xl select-none'>
                    <i className="fas fa-book mr-2"></i> Notes
                    </p>
                    <button
                        className='bg-secondary w-1/4 text-primary cursor-pointer py-1 px-2 rounded-r-sm text-sm focus:outline-none'
                        onClick={openNewNote}> {!addingNote ? (<><span><i className="fas fa-plus-square mr-2"></i>Create New</span></>) : (<><span><i className="fas fa-times mr-2"></i>Cancel</span></>)}
                    </button>
                </div>
                {addingNote ? (<>
                    <div className="flex flex-shrink-0 mt-2 mb-2 bg-body shadow-md rounded-md flex-col">
                    <div className='flex-shrink-0 text-center text-md inline-flex justify-center mt-2 mb-2'>
                        <i className="fas fa-heading mt-3 mb-2 ml-2 mr-2 text-primary"></i>
                        <input
                        type='text'
                        name='notesTitle'
                        placeholder='Title'
                        onChange={(e) => updateTitle(e.target.value)}
                        className='block w-full border-gray-300 rounded-r-md px-4 py-2 focus:outline-none'
                        required
                        />
                    </div>
                    <div className='flex-shrink-0 text-center text-md inline-flex justify-center mt-2 mb-2'>
                        <i className="fas fa-align-justify mt-3 mb-2 ml-2 mr-2 text-primary"></i>
                        <input
                        type='text'
                        name='notesContent'
                        placeholder='Content'
                        onChange={(e) => updateContent(e.target.value)}
                        className='block w-full border-gray-300 rounded-r-md px-4 py-2 focus:outline-none'
                        required
                        />
                    </div>
                    <button
                    className='cursor-pointer py-1 px-2 rounded-b-md shadow-sm focus:outline-none bg-primary text-secondary'
                    onClick={callNewNote}>
                    <i className="fas fa-save mr-2"></i>Save
                    </button>
                    </div>
                </>) : null}
                {notesList !== null ? (<div className="flex-1 flex flex-col justify-start p-1">
                    {notesList}
                </div>) : <div className="flex-1 flex flex-col justify-start p-1">
                    <h2 className="text-4xl text-primary text-center">
                        No Notes Available!!
                        </h2></div>}
            </div>
        </>
    )
}

export default Sidebar
