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
    const colletionRef = collection(db, "NewsData");

    // const owner = currentUser ? currentUser.uid : "unknown";
    // const ownerEmail = currentUser ? currentUser.email : "unknown";

    const value = {
      totalArticles: 526705,
      articles: [
        {
          title:
            "India's machinery exports to Russia jump three-fold in a year amid war",
          description:
            "Meanwhile, India’s engineering exports to many key markets, especially the US, EU, and China continued to decline June",
          content:
            "Even as Indian goods exports to the rest of the world are slowing, engineering goods exports to Russia and other CIS countries have registered a sharp uptick, jumping nearly three times from June last year, exporters said.The Russia-Ukraine war, whi... [4398 chars]",
          url: "https://www.livemint.com/news/india/indias-machinery-exports-to-russia-jump-three-fold-in-a-year-amid-war-11690111411426.html",
          image:
            "https://www.livemint.com/lm-img/img/2023/07/23/600x338/9TXRVFS1_1663954549961_1690111485840.jpg",
          publishedAt: "2023-07-23T11:27:49Z",
          source: {
            name: "Mint",
            url: "https://www.livemint.com",
          },
        },
      ],
    };

    const reference = doc(colletionRef,value.articles[0].publishedAt);
    await setDoc(reference, value);

    res.status(200).json(value);
  } catch (error) {
    res.status(500).json(error);
  }
}
