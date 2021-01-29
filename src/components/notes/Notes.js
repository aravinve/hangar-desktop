import { useEffect, useState } from "react"
import firebase from '../../firebase'
import Dashboard from "../home/Dashboard"
import Editor from "./Editor"
import Sidebar from "./Sidebar"
import Loader from '../../Loader'

function Notes() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [notes, setNotes] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editorTheme, setEditorTheme] = useState('snow')
  const [primary, setPrimary] = useState('')

  useEffect(() => {
    setLoading(true)
    const userPreferredData = JSON.parse(localStorage.getItem('userPreferedData'))
    const userArgsData = JSON.parse(localStorage.getItem('userArgsData'))
    const userEmail = userArgsData !== null && userArgsData['hangarEmail'] !== null ? userArgsData['hangarEmail']: ''
    setPrimary(userEmail)
    setEditorTheme(userPreferredData['theme'] ? 'bubble' : 'snow')
    firebase.firestore().collection('notes').where('primary', '==', userEmail).onSnapshot(serverUpdate => {
      const notesFromStore = serverUpdate.docs.map(doc => {
          const data = doc.data()
          data['id'] = doc.id
          return data
      })
      setNotes(notesFromStore)
      setLoading(false)
    })
  }, [])

  const selectNote  = (note, index) => {
    setSelectedNoteIndex(index)
    setSelectedNote(note)
    setShowEditor(true)
  }

  const noteUpdate = (id, noteObj) => {
    if(id && noteObj){
      firebase.firestore().collection('notes').doc(id).update({
        title: noteObj.title,
        content: noteObj.content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }

  const newNote = async (title, content) => {
    const note = {
      title: title,
      content: content
    }
    const dataFromDb = await firebase.firestore().collection('notes').add({
      primary: primary,
      title: note.title,
      content: note.content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    const dataId = dataFromDb.id
    await setNotes([...notes, note])
    const noteIndex = notes.indexOf(notes.filter(no => no.id === dataId)[0])
    setSelectedNote(notes[noteIndex])
    setSelectedNoteIndex(noteIndex)
  }

  const deleteNote = async (note) => {
    const noteIndex = notes.indexOf(note)
    await setNotes(notes.filter(no => no !== note))
    if(selectedNoteIndex === noteIndex){
      setSelectedNoteIndex(null)
      setSelectedNote(null)
      setShowEditor(false)
    } else {
      if(notes.length > 1){
        setSelectedNote(notes[selectedNoteIndex - 1])
        setSelectedNoteIndex(selectedNoteIndex - 1)
        setShowEditor(false)
      } else{
        setSelectedNoteIndex(null)
        setSelectedNote(null)
        setShowEditor(false)
      }
    }
    firebase.firestore().collection('notes').doc(note.id).delete()
  }

  return (
    <div className='flex flex-row justify-center'>
      {!loading ? (<Sidebar selectedNoteIndex={selectedNoteIndex} notes={notes} deleteNote={deleteNote} newNote={newNote} selectNote={selectNote} />) : <Loader />}
      {showEditor && selectNote ? (<Editor editorTheme={editorTheme} selectedNote={selectedNote} noteUpdate={noteUpdate} />): null}
      <Dashboard />
    </div>
  )
}

export default Notes
