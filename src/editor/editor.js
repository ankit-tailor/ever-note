import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { projectFirestore } from "../firebase/config";
import useDebounce from "../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";

const Editor = ({ classes, note }) => {
  const [editorNoteTitle, setEditorNoteTitle] = useState(
    note.selectedNote.title
  );
  const [editorNoteBody, setEditorNoteBody] = useState(note.selectedNote.body);
  const updateBodyDebounce = useDebounce(editorNoteBody, 1500);
  const updateTitleDebounce = useDebounce(editorNoteTitle, 1500);

  useEffect(() => {
    setEditorNoteTitle(note.selectedNote.title);
  }, [note.selectedNote]);

  useEffect(() => {
    setEditorNoteBody(note.selectedNote.body);
  }, [note.selectedNote]);

  useEffect(() => {
    if (updateBodyDebounce) {
      projectFirestore.collection("notes").doc(note.selectedNote.id).update({
        body: editorNoteBody,
      });
    }
  }, [updateBodyDebounce]);

  useEffect(() => {
    projectFirestore.collection("notes").doc(note.selectedNote.id).update({
      title: editorNoteTitle,
    });
  }, [updateTitleDebounce]);

  const updateNote = (text) => {
    setEditorNoteBody(text);
  };
  const updateTitle = (e) => {
    setEditorNoteTitle(e.target.value);
  };
  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon} />
      <input
        className={classes.titleInput}
        type="text"
        value={editorNoteTitle}
        placeholder="Note title..."
        onChange={updateTitle}
      />
      <ReactQuill
        id="quill"
        onChange={updateNote}
        value={editorNoteBody}
      ></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(Editor);
