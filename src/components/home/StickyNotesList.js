import moment from 'moment';
import {useState, useEffect} from 'react'
import StickyCard from './StickyCard';
import dragElement from './drag';
import {v4 as uuid} from 'uuid'
import StickyNote from './StickyNote';

function StickyNotesList() {

    const [stickyNotesList, setStickyNotesList] = useState([])

    useEffect(() => {
        dragElement(document.getElementById('mydiv'));
    }, [])

    const cardStyle = {
        zIndex: '9',
        top: '1rem',
        left: '1rem',
      };

    const cardHeaderStyle = {
        cursor: 'move',
        zIndex: '10',
      };

    const onTypeSearch = (e) => {
        console.log(e.target.value)
    }

    const addNewSticky = (e) => {
        const newStickyData = {
            id: uuid(),
            title: 'Notes Title',
            content: 'Notes Content',
            time: moment().format('YYYY-MM-DD hh:mm'),
            display: true
        }
        setStickyNotesList([...stickyNotesList, newStickyData])
    }

    const deleteNote = (id) => {
        setStickyNotesList(stickyNotesList.filter(note => note.id !== id))
    }

    const displayNote = (id) => {
        stickyNotesList.filter(note => note.id === id).map(note => {
            note.display = true
        })
        setStickyNotesList([...stickyNotesList])
    }

    const closeNote = (id) => {
        stickyNotesList.filter(note => note.id === id).map(note => {
            note.display = false
        })
        setStickyNotesList([...stickyNotesList])
    }

    const listDivision = stickyNotesList.length > 0 ?  stickyNotesList.map(stickyNote => (
        <StickyCard key={stickyNote.id} data={stickyNote} displayNote={displayNote} />
    )) : (
        <div className="p-1 mt-1 text-primary text-lg select-none">
            No Notes Available
        </div>
    ) 

    const stickyNoteDivision = stickyNotesList.length > 0 ? stickyNotesList.map(stickyNote =>(<StickyNote key={stickyNote.id} data={stickyNote} displayNote={stickyNote.display} deleteNote={deleteNote} closeNote={closeNote} />)) : null
      
    return (
        <>
        <div className="bg-secondary text-black shadow-md rounded-md fixed w-52" id='mydiv' style={cardStyle}>
            <div
            className='flex flex-row bg-primary rounded-t-md'
            id='mydivheader'
            style={cardHeaderStyle}>
                <div className="flex-1 pl-1 pt-1 pb-0.5 pr-0.5 m-1 text-lg text-secondary select-none"><i className='fas fa-sticky-note mr-1'></i>Sticky Notes</div>
                <button className='flex-shrink-0 pt-1 pb-0.5 pr-2 bg-primary outline-none rounded-t-md focus:outline-none text-secondary' onClick={addNewSticky}>
                    <i className='fas fa-plus'></i>
                </button>
            </div>
            <div className="flex bg-secondary text-black">
            <div className="flex-auto inline-flex items-center justify-center m-1 text-left text-sm shadow-md">
                <input
                    type='text'
                    id='sticky-search'
                    name='stickySearch'
                    placeholder='Search'
                    onChange={onTypeSearch}
                    className='block w-full border-gray-300 rounded-sm px-2 py-1 focus:outline-none'
                    />  
                </div>
            </div>
            <div className='h-40 p-1 text-sm overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
                {listDivision}
            </div>
        </div>
        {stickyNoteDivision}
        </>
    )
}

export default StickyNotesList
