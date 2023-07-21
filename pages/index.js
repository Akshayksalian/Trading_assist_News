import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";

function Home() {
  const [mediaData, setMediaData] = useState({});
  const [loading, setLoading] = useState(true);

  let NoData = false;

  async function createAiImage() {
    setLoading(true);

    try {
      const mediaId = await axios.get("./api/textToImage");
      setMediaData(mediaId.data);
      setLoading(false);
      console.log(mediaData.req.status);
    } catch (error) {
      setLoading(false);
    }
  }

  async function createInstagramPost(image) {
    try {
      const dataForContainer = {
        title: mediaData.newsData.articles[0].title,
        description: mediaData.newsData.articles[0].description,
        content: mediaData.newsData.articles[0].content,
        imageUrl: image,
        publishedAt: mediaData.newsData.articles[0].publishedAt,
      };

      const postData = await axios.post(
        "./api/createContainer",
        dataForContainer
      );
    } catch (error) {}
  }

  useEffect(() => {
    createAiImage();
  }, []);

  // useEffect(() => {
  //   createInstagramPost();
  //   const interval = setInterval(async () => {
  //       await createInstagramPost(); // API call
  //   }, (60000 * 60) * 4);
  // }, []);

  // const mediaData = {
  //   id: "1",
  //   newsImage:
  //     "https://www.online-image-editor.com/styles/2019/images/power_girl.png",
  //   aiImage:
  //     "https://www.online-image-editor.com/styles/2019/images/power_girl.png",
  // };

  if (loading) {
    return (
      <div className="bg-white ">
        <Spinner
          className="position-absolute top-50 start-50 translate-middle"
          animation="grow"
          variant="primary"
        />
      </div>
    );
  }

  if (mediaData.data === undefined) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1 className="text-uppercase">No new data!!</h1>
        <Button variant="secondary" onClick={createAiImage}>
          Reload
        </Button>
      </div>
    );
  }

  return (
    <div className="p-3 bg-white text-dark ">
      <Stack gap={3} className="vstack gap-2 col-md-5 mx-auto">
        <h1 className="mx-auto">Which one to post ?</h1>
        <Image src={mediaData.newsImage} height={300} rounded />
        <Button
          className="primary"
          onClick={() => createInstagramPost(mediaData.newsImage)}
        >
          Post - News image
        </Button>
        <Image src={mediaData.aiImage} height={300} rounded />
        <Button
          className="primary"
          onClick={() => createInstagramPost(mediaData.aiImage)}
        >
          Post - Ai image
        </Button>
        <br />
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Title</Accordion.Header>
            <Accordion.Body>
              {mediaData.newsData.articles[0].title}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Description</Accordion.Header>
            <Accordion.Body>
              {mediaData.newsData.articles[0].description}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Content</Accordion.Header>
            <Accordion.Body>
              {mediaData.newsData.articles[0].content}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </div>
  );
}

export default Home;
