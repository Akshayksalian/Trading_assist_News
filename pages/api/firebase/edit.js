import db from "@/firebase/initFirebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export default async function handler(req, res) {
  const value = req.body;

  try {
    const colletionRef = collection(db, value.collectionId);

    const updateRef = doc(colletionRef, value.documentId);
    updateDoc(updateRef, value.data);

    res.status(200).json({ response: { message: "Updated successfully" } });
  } catch (error) {
    res.status(500).json(error);
  }
}
