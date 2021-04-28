import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { projectAuth, projectFirestore } from "../firebase/config";
import useDebounce from "../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import screenfull from "screenfull";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

const Editor = ({ classes, note }) => {
  const [editorNoteTitle, setEditorNoteTitle] = useState(
    note.selectedNote.title
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
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
      projectFirestore
        .collection(`users/${projectAuth.currentUser.uid}/notes`)
        .doc(note.selectedNote.id)
        .update({
          body: editorNoteBody,
        });
    }
  }, [updateBodyDebounce]);

  useEffect(() => {
    projectFirestore
      .collection(`users/${projectAuth.currentUser.uid}/notes`)
      .doc(note.selectedNote.id)
      .update({
        title: editorNoteTitle,
      });
  }, [updateTitleDebounce]);

  const updateNote = (text) => {
    setEditorNoteBody(text);
  };
  const updateTitle = (e) => {
    setEditorNoteTitle(e.target.value);
  };

  const fullScreen = () => {
    if (screenfull.isEnabled) {
      setIsFullscreen(!isFullscreen);
      screenfull.toggle(document.querySelector("#editorContainer"));
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "code"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "color",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code",
  ];

  return (
    <div id="editorContainer" className={classes.editorContainer}>
      <div className={classes.editorHeader}>
        <BorderColorIcon className={classes.editIcon} />

        <input
          className={classes.titleInput}
          type="text"
          value={editorNoteTitle}
          placeholder="Note title..."
          onChange={updateTitle}
        />
        {!isFullscreen && (
          <FullscreenIcon className={classes.expandIcon} onClick={fullScreen} />
        )}
        {isFullscreen && (
          <FullscreenExitIcon
            className={classes.expandIcon}
            onClick={fullScreen}
          />
        )}
      </div>
      <ReactQuill
        id="quill"
        onChange={updateNote}
        value={editorNoteBody}
        modules={modules}
        formats={formats}
      ></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(Editor);
