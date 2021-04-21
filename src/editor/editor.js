import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import firebase, { projectFirestore } from "../firebase/config";
import useDebounce from "../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";

const Editor = ({ classes, selectedNote }) => {
  const [note, setNote] = useState({
    text: selectedNote.body,
    title: selectedNote.title,
    id: selectedNote.id,
  });

  useEffect(() => {
    setNote({
      text: selectedNote.body,
      title: selectedNote.title,
      id: selectedNote.id,
    });
  }, [selectedNote]);

  const updateNoteText = useDebounce(note.text, 1500);
  const updateNoteTitle = useDebounce(note.title, 1500);

  useEffect(() => {
    if (updateNoteText) {
      projectFirestore.collection("notes").doc(selectedNote.id).update({
        body: note.text,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }, [updateNoteText]);

  useEffect(() => {
    if (updateNoteTitle) {
      projectFirestore.collection("notes").doc(selectedNote.id).update({
        title: note.title,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }, [updateNoteTitle]);

  // console.log(selectedNote);

  const updateNote = async (value) => {
    await setNote({
      ...note,
      text: value,
    });
  };

  const updateTitle = async (e) => {
    const text = e.target.value;
    await setNote({ ...note, title: text });
  };

  // console.log(note.text);

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon} />
      <input
        className={classes.titleInput}
        type="text"
        placeholder="Note title..."
        value={note.title}
        onChange={updateTitle}
      />
      <ReactQuill value={note.text} onChange={updateNote}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(Editor);
