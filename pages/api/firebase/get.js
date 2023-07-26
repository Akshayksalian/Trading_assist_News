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
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export default async function handler(req, res) {
  try {

    const colletionRef = collection(db, "NewsData");

    const docRef = doc(db, "NewsData", "valuesForValidation");
    const docSnap = await getDoc(docRef);

    // const querySnapshot = await getDocs(colletionRef);


    // res.status(200).json(docSnap._document.data.value.mapValue.fields.lastPublishedDate.stringValue);
    res.status(200).json(docSnap._document.data.value.mapValue.fields.lastPublishedDate.stringValue);
  } catch (error) {
    res.status(500).json(error);
  }
}
