const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
  },
  newChatBtn: {
    borderRadius: "0px",
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px",
  },
  newNoteBtn: {
    width: "100%",
    height: "35px",
    borderBottom: "1px solid black",
    borderRadius: "0px",
    backgroundColor: "#03203C",
    color: "white",
    "&:hover": {
      backgroundColor: "#011222",
    },
  },
  sidebarContainer: {
    marginTop: "0px",
    width: "300px",
    height: "100%",
    boxSizing: "border-box",
    overflowY: "scroll",
  },
  newNoteInput: {
    width: "100%",
    margin: "0px",
    height: "35px",
    outline: "none",
    border: "none",
    paddingLeft: "5px",
    "&:focus": {
      outline: "2px solid #011222",
    },
  },
  newNoteSubmitBtn: {
    width: "100%",
    backgroundColor: "#03203C",
    borderRadius: "0px",
    color: "white",
    transition: "all 0.2 linear",
    "&:hover": {
      backgroundColor: "#011222",
    },
  },
  signoutBtn: {
    position: "sticky",
    bottom: "0",
    width: "100%",
    height: "35px",
    borderBottom: "1px solid black",
    borderRadius: "0px",
    backgroundColor: "#03203C",
    color: "white",
    "&:hover": {
      backgroundColor: "#011222",
    },
  },
});

export default styles;
