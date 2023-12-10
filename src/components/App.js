import React, { useState } from "react";
import NoteCard from "./NoteCard";
import AddNotePopup from "./AddNotePopup";
// import "../css/styles.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [noteIdCounter, setNoteIdCounter] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Add
  const addNote = () => {
    setIsAdding(true);
  };

  const saveAddNote = (newNote) => {
    setNotes([...notes, { id: noteIdCounter, ...newNote }]);
    setNoteIdCounter(noteIdCounter + 1);
    cancelAddNote();
  };

  const cancelAddNote = () => {
    setIsAdding(false);
  };

  // Edit
  const editNote = (id) => {
    const note = notes.filter((note) => note.id === id)[0];
    setIsEditing(note);
  };

  const saveEditNote = (newNote) => {
    setNotes(
      notes.map((note) =>
        note.id === isEditing.id ? { ...note, ...newNote } : note
      )
    );
    cancelEditNote();
  };

  const cancelEditNote = () => {
    setIsEditing(false);
  };

  // Delete
  const deleteNote = (id) => {
    const note = notes.filter((note) => note.id === id)[0];
    if (
      window.confirm("Are you sure you want to delete: '" + note.title + "'")
    ) {
      saveDeleteNote(id);
    }
  };

  const saveDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
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
            {!notes.length && (
              <p className="empty-message">
                No notes taken yet. Click the '+' button to add a new note.
              </p>
            )}
          </div>
          <div className="container">
            <div className="notes">
              {notes
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
