import {useEffect} from 'react'
import dragElement from './drag';

function StickyNote({data, displayNote, deleteNote, closeNote, handleChange}) {

  useEffect(() => {
    dragElement(document.getElementById(data.id));
  }, [displayNote])

  return (
    <>
    {displayNote ? (
      <div className='bg-secondary text-primary shadow-md rounded-md fixed w-48' id={data.id} style={cardStyle}>
        <div
          className='flex bg-primary rounded-t-md items-center justify-start'
          id={data.id.toString().concat("header")}
          style={cardHeaderStyle}
        >
          <div className="text-primary flex-auto text-xs mx-1 my-2 text-secondary opacity-0 hover:opacity-100">
            {data.time}
          </div>
          <div className="flex flex-auto justify-end">
            <span className="flex-shrink-0 text-secondary mx-1 my-2 cursor-pointer text-sm float-right" onClick={() => deleteNote(data.id)}>
              <i className='fas fa-trash'></i>
            </span>
            <span className="flex-shrink-0 text-secondary mx-2 my-2 cursor-pointer text-sm float-right" onClick={() => closeNote(data.id)}>
              <i className='fas fa-times-circle'></i>
            </span>
          </div>
        </div>
        <div className='flex-auto text-primary p-1 font-medium text-xl outline-none focus:outline-none'>
          <input type="text" name="title" className="block w-full border-gray-300 rounded-md px-2 py-2 focus:outline-none" value={data.title} onChange={(e) => handleChange(e, data.id)} />
        </div>
        <div
          className='p-1 text-sm overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
          <textarea name="content" className="h-40 block w-full border-gray-300 rounded-md px-2 py-2 focus:outline-none" value= {data.content} onChange={(e) => handleChange(e, data.id)}>
              {data.content}
          </textarea>
        </div>
      </div>) : null}
    </>
   
  );
}

const cardStyle = {
  zIndex: '9',
  top: '1rem',
  left: '16rem',
};

const cardHeaderStyle = {
  cursor: 'move',
  zIndex: '10',
};

export default StickyNote;
