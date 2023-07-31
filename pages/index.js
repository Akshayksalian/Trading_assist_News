import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";

function Automate() {
  const [mediaData, setMediaData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getNews() {
    try {
      const mediaId = await axios.get("./api/getNewsData");
      setMediaData(mediaId.data);

      const previousDate = await axios.get("./api/firebase/get");

      if (
        mediaData.articles[0].publishedAt !==
        previousDate.data.lastPublishedDate
      ) {
        createInstagramPost();

        const editParams = {
          collectionId: "NewsData",
          documentId: "valuesForValidation",
          data: {
            lastPublishedDate: mediaData.articles[0].publishedAt,
          },
        };

        const updateDate = await axios.post("./api/firebase/edit", editParams);

        // console.log(updateDate);
      } else {
        console.log(previousDate.data.lastPublishedDate);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function createInstagramPost() {
    try {
      const dataForContainer = {
        title: mediaData.articles[0].title,
        description: mediaData.articles[0].description,
        content: mediaData.articles[0].content,
        imageUrl: mediaData.articles[0].image,
        publishedAt: mediaData.articles[0].publishedAt,
      };

      const postData = await axios.post(
        "./api/createContainer",
        dataForContainer
      );

      console.log(postData.data);
    } catch (error) {}
  }

  useEffect(() => {
    getNews();
    const interval = setInterval(async () => {
      await getNews(); // API call
    }, 60000 * 60); // equal to 1 min * 60
  }, []);

  //   useEffect(() => {
  //     getNews();
  //   }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return <h1>Uploaded</h1>;
}

export default Automate;
