import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";

function Home() {
  const [mediaData, setMediaData] = useState({});
  const [loading, setLoading] = useState(true);

  async function createAiImage() {
    setLoading(true);

    try {
      const mediaId = await axios.get("./api/textToImage");
      setMediaData(mediaId.data);
      setLoading(false);
      console.log(mediaData);
    } catch (error) {
      setLoading(false);
    }
  }

  async function createInstagramPost(image) {
    try {
      const dataForContainer = {
        title: mediaData.response.newsData.articles[0].title,
        description: mediaData.response.newsData.articles[0].description,
        content: mediaData.response.newsData.articles[0].content,
        imageUrl: image,
        publishedAt: mediaData.response.newsData.articles[0].publishedAt,
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

  // useEffect(() => {
  //   createInstagramPost();
  //   const interval = setInterval(async () => {
  //     await createInstagramPost(); // API call
  //   }, 60000 * 60 * 1);
  // }, []);

  // const mediaData = {
  //   response: {
  //     message: "Success",
  //     aiImage:
  //       "https://stars-test.s3.amazonaws.com/rapid/f9268b0d-d679-4548-b1c9-ba46202e1a33-0.png",
  //     newsImage:
  //       "https://www.reuters.com/resizer/QfI6gTUz5Y4hYdn64faV5k6g4aU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/XJROGQAP4JKGLJYJRR3O6POELM.jpg",
  //     newsData: {
  //       totalArticles: 526737,
  //       articles: [
  //         {
  //           title: "China's Alibaba says will not join Ant Group share buyback",
  //           description:
  //             "China's Alibaba Group said on Sunday it had decided not to participate in affiliate Ant Group's proposed repurchase of shares, but would maintain its shareholding in the company.",
  //           content:
  //             "BEIJING, July 23 (Reuters) - China's Alibaba Group (9988.HK) said on Sunday it had decided not to participate in affiliate Ant Group's proposed repurchase of shares, but would maintain its shareholding in the company.Ant Group announced a surprise s... [609 chars]",
  //           url: "https://www.reuters.com/business/chinas-alibaba-says-it-will-not-join-ant-group-share-buyback-2023-07-23/",
  //           image:
  //             "https://www.reuters.com/resizer/QfI6gTUz5Y4hYdn64faV5k6g4aU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/XJROGQAP4JKGLJYJRR3O6POELM.jpg",
  //           publishedAt: "2023-07-23T12:20:00Z",
  //           source: {
  //             name: "Reuters",
  //             url: "https://www.reuters.com",
  //           },
  //         },
  //       ],
  //     },
  //   },
  // };

  return (
    <div className="p-3 bg-white text-dark ">
      <Stack gap={3} className="vstack gap-2 col-md-5 mx-auto">
        <h1 className="mx-auto">
          Which one to post ?{" "}
          <Badge bg="secondary" onClick={() => createAiImage()}>
            Reload
          </Badge>
        </h1>
        <Image src={mediaData.response.newsImage} height={300} rounded />
        <Button
          className="primary"
          onClick={() => createInstagramPost(mediaData.response.newsImage)}
        >
          Post - News image
        </Button>
        <Image src={mediaData.response.aiImage} height={300} rounded />
        <Button
          className="primary"
          onClick={() => createInstagramPost(mediaData.response.aiImage)}
        >
          Post - Ai image
        </Button>
        <br />
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Title</Accordion.Header>
            <Accordion.Body>
              {mediaData.response.newsData.articles[0].title}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Description</Accordion.Header>
            <Accordion.Body>
              {mediaData.response.newsData.articles[0].description}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Content</Accordion.Header>
            <Accordion.Body>
              {mediaData.response.newsData.articles[0].content}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </div>
  );
}

export default Home;
