import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../sidebaritem/sidebarItem";
import useFirestore from "../hooks/useFirestore";
import firebase, { projectAuth, projectFirestore } from "../firebase/config";

const Sidebar = ({ classes, note, setNote }) => {
  const [newNote, setNewNote] = useState({
    addingNote: false,
    title: "",
  });

  const { allNotes } = useFirestore(
    `users/${projectAuth.currentUser.uid}/notes`
  );

  const { addingNote, title } = newNote;

  useEffect(() => {
    setNote({ ...note, selectedNote: allNotes[note.selectedNoteIndex] });
  }, [allNotes, note.selectedNote]);

  const createNewNote = () => {
    setNewNote({ ...newNote, addingNote: !addingNote });
  };
  const addNewNote = (e) => {
    e.preventDefault();
    if (newNote.title === "") {
      alert("Title can't be empty!!");
    } else {
      projectFirestore
        .collection(`users/${projectAuth.currentUser.uid}/notes`)
        .add({
          title: title,
          body: "",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setNewNote({ title: null, addingNote: false });
      setNote({
        ...note,
        selectedNoteIndex: 0,
        selectedNote: null,
      });
    }
  };
  const updateTitle = (e) => {
    const text = e.target.value;
    setNewNote({ ...newNote, title: text });
  };

  const selectNote = (note, index) => {
    setNote({ ...note, selectedNote: note, selectedNoteIndex: index });
  };

  const deleteNote = (notee, index) => {
    projectFirestore
      .collection(`users/${projectAuth.currentUser.uid}/notes`)
      .doc(notee.id)
      .delete();
    if (note.selectedNoteIndex === index) {
      setNote({ ...note, selectedNoteIndex: null, selectedNote: null });
    } else if (index > note.selectedNoteIndex) {
      setNote({
        ...note,
        selectedNoteIndex: note.selectedNoteIndex,
        selectedNote: allNotes[note.selectedNoteIndex],
      });
    } else {
      note.selectedNoteIndex === 0
        ? setNote({
            ...note,
            selectedNoteIndex: note.selectedNoteIndex,
            selectedNote: allNotes[note.selectedNoteIndex],
          })
        : allNotes.length > 1
        ? setNote({
            ...note,
            selectedNoteIndex: note.selectedNoteIndex - 1,
            selectedNote: allNotes[note.selectedNoteIndex - 1],
          })
        : setNote({ ...note, selectedNoteIndex: null, selectedNote: null });
    }
  };

  return (
    <div id="sidebar" className={classes.sidebarContainer}>
      <Button className={classes.newNoteBtn} onClick={createNewNote}>
        {addingNote ? "Cancel" : "New Note"}
      </Button>
      {addingNote && (
        <div>
          <form onSubmit={addNewNote}>
            <input
              className={classes.newNoteInput}
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={updateTitle}
              required
            />
            <Button type="submit" className={classes.newNoteSubmitBtn}>
              Add Note
            </Button>
          </form>
        </div>
      )}
      <List>
        {allNotes &&
          allNotes.map((_note, _index) => {
            return (
              <div key={_index}>
                <SidebarItem
                  _note={_note}
                  _index={_index}
                  selectNote={selectNote}
                  selectedNoteIndex={note.selectedNoteIndex}
                  deleteNote={deleteNote}
                />
                <Divider />
              </div>
            );
          })}
      </List>
      <Button
        className={classes.signoutBtn}
        onClick={() => projectAuth.signOut()}
      >
        SignOut
      </Button>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
