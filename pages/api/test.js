import axios from "axios";

export default async function handler(req, res) {
  try {

    const newsData = await axios.get("http://localhost:3000/api/getNewsData");

    const textToImageParams = {
      textForImage: newsData.data.articles[0].title,
    };

    const imageData = await axios.post(
      "http://localhost:3000/api/textToImage",
      textToImageParams
    );

    console.log(imageData.data);
    res.status(200).json(imageData.data);
  } catch (error) {
    res.status(500).json(error);
  }
}
