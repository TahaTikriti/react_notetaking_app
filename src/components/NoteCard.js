
import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className='note-buttons-container'>
        <button onClick={()=> onEdit(note.id)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
