import React, { useState, useEffect } from "react";
import Editor from "./editor/editor";
import useFirestore from "./hooks/useFirestore";
import Sidebar from "./sidebar/sidebar";

function App() {
  const [note, setNote] = useState({
    selectedNote: null,
    selectedNoteIndex: null,
    notes: null,
  });
  const { allNotes } = useFirestore("notes");
  const { selectedNote } = note;

  useEffect(() => {
    setNote({ ...note, notes: allNotes });
  }, [allNotes]);

  return (
    <div className="App">
      <Sidebar setNote={setNote} note={note} />
      {selectedNote && <Editor setNote={setNote} note={note} />}
    </div>
  );
}

export default App;
