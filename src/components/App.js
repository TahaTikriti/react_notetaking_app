import React, { useReducer, useState } from "react";
import NoteCard from "./NoteCard";
import AddNotePopup from "./AddNotePopup";
// import "../css/styles.css";

// Action types
const NoteActionTypes = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

// Reducer function
const notesReducer = (state, action) => {
  switch (action.type) {
    case NoteActionTypes.ADD:
      return {
        ...state,
        idCounter: state.idCounter + 1,
        notes: [...state.notes, { ...action.payload, id: state.idCounter }],
      };
    case NoteActionTypes.EDIT:
      return {
        ...state,
        notes: [
          state.notes.map((note) => {
            return note.id === action.payload.id
              ? { ...note, ...action.payload }
              : note;
          }),
        ],
      };
    case NoteActionTypes.DELETE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
    default:
      return state;
  }
};

function App() {
  const initialNotes = {
    idCounter: 1,
    notes: [],
  };
  const [notesState, notesDispatch] = useReducer(notesReducer, initialNotes);

  // const [notes, setNotes] = useState([]);
  // const [noteIdCounter, setNoteIdCounter] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Add
  const addNote = () => {
    setIsAdding(true);
  };

  const saveAddNote = (newNote) => {
    notesDispatch({
      type: NoteActionTypes.ADD,
      payload: newNote,
    });
    // setNotes([...notes, { id: noteIdCounter, ...newNote }]);
    // setNoteIdCounter(noteIdCounter + 1);
    cancelAddNote();
  };

  const cancelAddNote = () => {
    setIsAdding(false);
  };

  // Edit
  const editNote = (id) => {
    const note = notesState.notes.filter((note) => note.id === id)[0];
    setIsEditing(note);
  };

  const saveEditNote = (newNote) => {
    notesDispatch({ type: NoteActionTypes.EDIT, payload: newNote });
    // setNotes(
    //   notes.map((note) =>
    //     note.id === isEditing.id ? { ...note, ...newNote } : note
    //   )
    // );
    cancelEditNote();
  };

  const cancelEditNote = () => {
    setIsEditing(false);
  };

  // Delete
  const deleteNote = (id) => {
    const note = notesState.notes.filter((note) => note.id === id)[0];
    if (
      window.confirm("Are you sure you want to delete: '" + note.title + "'")
    ) {
      saveDeleteNote(id);
    }
  };

  const saveDeleteNote = (id) => {
    notesDispatch({ type: NoteActionTypes.DELETE, payload: { id } });
    // setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <>
      <div className="container">
        <div className="search">
          <input
            type="text"
            placeholder="Search notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-button" onClick={() => addNote()}>
            Add Note
          </button>
        </div>
      </div>
      <div className="container">
        <div className="app">
          <div className="header_message">
            {!notesState.notes.length && (
              <p className="empty-message">
                No notes taken yet. Click the '+' button to add a new note.
              </p>
            )}
          </div>
          <div className="container">
            <div className="notes">
              {notesState.notes
                .filter((note) =>
                  `${note.title} ${note.content}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={editNote}
                    onDelete={deleteNote}
                  />
                ))}
              {isAdding && (
                <AddNotePopup onSave={saveAddNote} onCancel={cancelAddNote} />
              )}
              {isEditing && (
                <AddNotePopup
                  note={isEditing}
                  onSave={saveEditNote}
                  onCancel={cancelEditNote}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
