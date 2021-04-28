const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    // width: "300px",
    boxShadow: "0px 0px 2px black",
  },
  titleInput: {
    height: "50px",
    boxSizing: "border-box",
    border: "none",
    padding: "5px",
    fontSize: "24px",
    width: "100%",
    color: "white",
    backgroundColor: "#03203C",
    paddingLeft: "50px",
  },
  editIcon: {
    position: "absolute",
    marginLeft: "1rem",
    top: "12px",
    color: "white",
    width: "10",
    height: "10",
  },
  editorContainer: {
    height: "100vh",
    boxSizing: "border-box",
    width: "100%",
  },
  editorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#03203C",
  },
  expandIcon: {
    fontSize: "2rem !important",
    cursor: "pointer",
    color: "white",
    marginRight: "1rem",
  },
});

export default styles;
