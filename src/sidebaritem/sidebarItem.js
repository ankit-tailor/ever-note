import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helper";

const SidebarItem = ({
  classes,
  _note,
  _index,
  selectedNoteIndex,
  selectNote,
  deleteNote,
}) => {
  const confirmDelete = (note, index) => {
    if (window.confirm(`Are you sure you want to delete ${note.title}`)) {
      deleteNote(note, index);
    }
  };
  return (
    <div key={_index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _index}
        align-items="flex-start"
      >
        <div
          className={classes.textSelection}
          onClick={() => selectNote(_note, _index)}
        >
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(
              _note && `${_note.body.substr(0, 30)}...`
            )}
          />
        </div>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => confirmDelete(_note, _index)}
        />
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SidebarItem);
