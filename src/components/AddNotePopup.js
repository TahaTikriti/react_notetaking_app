import React, { useState } from "react";

const AddNotePopup = ({
  note = { title: "", content: "" },
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({ title, content });
  };

  return (
    <div className="add-note-popup">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="popup-buttons-container">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AddNotePopup;
