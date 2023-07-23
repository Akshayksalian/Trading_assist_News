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
// import { AuthContext } from "./auth/Auth";
import { Button } from "react-bootstrap";

function learnFirebase() {
  const colletionRef = collection(db, "NewsData");

  //   const { currentUser } = useContext(AuthContext);

  // ADD FUNCTION
  async function addSchool() {
    // const owner = currentUser ? currentUser.uid : "unknown";
    // const ownerEmail = currentUser ? currentUser.email : "unknown";

    const newSchool = {
      count: 1,
    };

    try {
      const schoolRef = doc(colletionRef);
      const response = await setDoc(schoolRef, newSchool);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // EDIT FUNCTION
  async function editSchool() {
    const updatedSchool = {
      newsApiCount: 100,
    };

    try {
      const schoolRef = doc(colletionRef, "ApiCount");
      updateDoc(schoolRef, updatedSchool);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Button onClick={addSchool}>Add data</Button>
      <Button onClick={editSchool}>Edit data</Button>
    </div>
  );
}

export default learnFirebase;
