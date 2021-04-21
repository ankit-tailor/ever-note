import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    let unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setAllNotes(documents);
      });
    return () => unsub();
  }, [collection]);
  // console.log(notes);
  return { allNotes };
};

export default useFirestore;
