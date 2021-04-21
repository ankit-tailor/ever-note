import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../sidebaritem/sidebarItem";
import useFirestore from "../hooks/useFirestore";
import firebase, { projectFirestore } from "../firebase/config";

const Sidebar = ({ classes, selectedNoteIndex, selectNote }) => {
  const [note, setNote] = useState({
    addingNote: false,
    title: null,
  });
  const { addingNote, title } = note;
  const { allNotes } = useFirestore("notes");

  const newNote = () => {
    setNote({
      ...note,
      addingNote: !addingNote,
    });
  };

  const updateTitle = (e) => {
    const textTitle = e.target.value;
    setNote({ ...note, title: textTitle });
  };

  const addNewNote = () => {
    projectFirestore
      .collection("notes")
      .add({
        title: title,
        body: "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setNote({ addingNote: !addingNote, title: null });
      });
  };

  const deleteNote = (note) => {
    projectFirestore.collection("notes").doc(note.id).delete();
    // console.log(note);
  };

  return (
    <div className={classes.sidebarContainer}>
      <Button className={classes.newNoteBtn} onClick={newNote}>
        {addingNote ? "Cancel" : "New Note"}
      </Button>
      {addingNote && (
        <div>
          <input
            className={classes.newNoteInput}
            type="text"
            placeholder="Enter title"
            onChange={updateTitle}
          />
          <Button className={classes.newNoteSubmitBtn} onClick={addNewNote}>
            Add Note
          </Button>
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
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={selectNote}
                  deleteNote={() => deleteNote(_note)}
                />
                <Divider />
              </div>
            );
          })}
      </List>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
