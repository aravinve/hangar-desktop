import {useState, useEffect} from 'react'
import ReactQuill from 'react-quill'
import debounce from './helpers'
import 'react-quill/dist/quill.snow.css';


function Editor({selectedNoteIndex, selectedNote, notes, noteUpdate}) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if(selectedNote){
            setTitle(selectedNote.title)
            setContent(selectedNote.content)
            setId(selectedNote.id)
        } else{
            setTitle('')
            setContent('')
            setId('')
        }
    }, [selectedNote])

    useEffect(() => {
        if(selectedNote && selectedNote.id !== id){
            setTitle(selectedNote.title)
            setContent(selectedNote.content)
            setId(selectedNote.id)
        }
    }, [id])

    const update = debounce(() => {
        noteUpdate(id, {title, content})
    }, 2000);

    const updateTitle = async (value) => {
        await setTitle(value)
        update()
    }

    const updateBody = async (value) => {
        await setContent(value)
        update()
    }

    return (
        <div className='flex-auto flex flex-col'>
            <div className='flex-shrink-0 p-2 text-center text-md inline-flex justify-center bg-primary'>
            <i className="fas fa-edit mt-3 mb-2 ml-2 mr-2 text-secondary"></i>
                <input
                type='text'
                name='title'
                placeholder='Title'
                onChange={(e) => updateTitle(e.target.value)}
                value={title}
                className='block bg-primary text-secondary w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none'
                />
            </div>
            <ReactQuill theme="snow" value={content} onChange={updateBody} className='flex-1 h-screen w-full'>
            </ReactQuill>
        </div>
    )
}

export default Editor
