import axios from "axios";
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
  try {
    const params = {
      collectionId: "NewsData",
      documentId: "valuesForValidation",
      data: {
        lastPublishedDate: "2023-07-20T16:31:00A",
      },
    };

    const updatePublishDateToDb = await axios.post(
      "http://localhost:3000/api/firebase/edit",
      params
    );

    res.status(200).json(req.headers.host);
  } catch (error) {
    res.status(500).json(error);
  }
}
