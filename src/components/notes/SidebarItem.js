import {removeHTMLTags} from './helpers'

function SidebarItem({note, index, selectedNoteIndex, selectNote, deleteNote}) {
    return (
        <div key={index} className='cursor-pointer flex flex-col justify-start' onClick={() => selectNote(note, index)}>
            <div className="flex-auto flex flex-col">
                <div className="flex-auto inline-flex">
                    <h4 className="flex-auto text-xl text-primary">
                        {note.title}
                    </h4>
                    <div className='flex-shrink-0'>
                        <button
                            className='cursor-pointer text-primary text-sm p-1 rounded-sm focus:outline-none'
                            onClick={() => deleteNote(note)}>
                            <i className='fas fa-trash'></i>
                        </button>
                    </div>
                </div>
                <div className="flex-auto">
                    <p className="text-sm text-primary text-justify">
                        {removeHTMLTags(note.content.toString().substring(0,50).concat('...'))}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SidebarItem
