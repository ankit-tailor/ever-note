import React, { useState } from "react";
import Editor from "./editor/editor";
import { projectFirestore } from "./firebase/config";
import Sidebar from "./sidebar/sidebar";

function App() {
  const [notes, setNotes] = useState({
    selectedNoteIndex: null,
    selectedNote: null,
    allNotes: null,
  });
  const { selectedNoteIndex, selectedNote, allNotes } = notes;

  const selectNote = (note, index) => {
    setNotes({ ...notes, selectedNoteIndex: index, selectedNote: note });
  };

  const deleteNote = (note) => {
    projectFirestore.collection("notes").doc(note.id).delete();
  };

  return (
    <div className="App">
      <Sidebar
        selectedNoteIndex={selectedNoteIndex}
        setNotes={setNotes}
        selectNote={selectNote}
        notes={notes}
      />
      {selectedNote && (
        <Editor
          note={allNotes}
          selectedNotesIndex={selectedNoteIndex}
          selectedNote={selectedNote}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
}

export default App;
