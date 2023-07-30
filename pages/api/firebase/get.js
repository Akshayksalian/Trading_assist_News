import db from "@/firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const colletionRef = collection(db, "NewsData");

    const docSnap = await getDocs(colletionRef);

    const items = [];

    docSnap.docs.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });

    const finalValue = items.find((item) => item.id === "valuesForValidation");

    res.status(200).json(finalValue);
  } catch (error) {
    res.status(500).json(error);
  }
}
