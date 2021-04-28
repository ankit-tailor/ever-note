import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Authentication from "./Authentication/Authentication";
import Editor from "./editor/editor";
import { projectAuth } from "./firebase/config";
import Sidebar from "./sidebar/sidebar";

function App() {
  const [user] = useAuthState(projectAuth);
  const [note, setNote] = useState({
    selectedNote: null,
    selectedNoteIndex: null,
    notes: null,
  });
  const { selectedNote } = note;

  return (
    <div id="App" className="App">
      {!user ? (
        <Authentication />
      ) : (
        <div className="container">
          <Sidebar setNote={setNote} note={note} />
          {selectedNote && <Editor setNote={setNote} note={note} />}
        </div>
      )}
      {/* <Sidebar setNote={setNote} note={note} />
      {selectedNote && <Editor setNote={setNote} note={note} />} */}
    </div>
  );
}

export default App;
