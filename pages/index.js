import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

function Index() {
  const [mediaData, setMediaData] = useState({});
  const [firebaseData, setFirebaseData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getNewsData() {
    try {
      const newsData = await axios.get("./api/getNewsData");
      setMediaData(newsData.data);
      setLoading(false);

      const previousPublishedData = await axios.get("./api/firebase/get");
      setFirebaseData(previousPublishedData.data);

      if (
        newsData.data.articles[0].publishedAt !=
        previousPublishedData.data.lastPublishedDate
      ) {
        const editParams = {
          collectionId: "NewsData",
          documentId: "valuesForValidation",
          data: {
            lastPublishedDate: newsData.data.articles[0].publishedAt,
          },
        };

        const updateDate = await axios.post("./api/firebase/edit", editParams);

        const dataForContainer = {
          title: newsData.data.articles[0].title,
          description: newsData.data.articles[0].description,
          content: newsData.data.articles[0].content,
          imageUrl: newsData.data.articles[0].image,
          publishedAt: newsData.data.articles[0].publishedAt,
        };

        const postData = await axios.post(
          "./api/createContainer",
          dataForContainer
        );

      }
    } catch (error) {}
  }

  useEffect(() => {
    setInterval(async () => await getNewsData(), 60000 * 30);
  }, []);

  if (loading) {
    return (
      <div className="bg-white position-absolute top-50 start-50 translate-middle">
        <Spinner className="" animation="grow" variant="primary" />
      </div>
    );
  }

  return (
    <div className="bg-white position-absolute top-50 start-50 translate-middle">
      <h1>Data from newsUrl : {mediaData.articles[0].publishedAt}</h1>
      <h1>Data from firestore : {firebaseData.lastPublishedDate}</h1>
    </div>
  );
}

export default Index;
