import axios from "axios";

export default async function handler(req, res) {
  try {
    const newsData = await axios.get(
      `http://${req.headers.host}/api/getNewsData`
    );

    const previousPublishedData = await axios.get(
      `http://${req.headers.host}/api/firebase/get`
    );

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

      const updateDate = await axios.post(
        `http://${req.headers.host}/api/firebase/edit`,
        editParams
      );

      const dataForContainer = {
        title: newsData.data.articles[0].title,
        description: newsData.data.articles[0].description,
        content: newsData.data.articles[0].content,
        imageUrl: newsData.data.articles[0].image,
        publishedAt: newsData.data.articles[0].publishedAt,
      };

      const postData = await axios.post(
        `http://${req.headers.host}/api/createContainer`,
        dataForContainer
      );

      res.status(200).json(postData.data);
    } else {
      res.status(404).json({ error: "No data was published" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
