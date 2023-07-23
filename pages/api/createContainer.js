import axios from "axios";

export default async function handler(req, res) {
  try {
    const contentData = req.body;

    var date = new Date(contentData.publishedAt);
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    var localDate = new Date(now_utc);

    const finalDate =
      localDate.getFullYear() +
      "-" +
      (localDate.getMonth() + 1) +
      "-" +
      localDate.getDate() +
      " " +
      localDate.getHours() +
      ":" +
      localDate.getMinutes() +
      ":" +
      localDate.getSeconds();

    const imageUrl = contentData.imageUrl;
    const caption =
      contentData.title +
      "\n\n" +
      contentData.description +
      "\n\n" +
      contentData.content +
      "\n" +
      "IST : " +
      finalDate.toLocaleString();

    const containerParameter = {
      image_url: imageUrl,
      caption: caption,
      access_token: process.env.facebookAccessToken,
    };

    const containerId = await axios.post(
      "https://graph.facebook.com/v17.0/17841460615589377/media",
      containerParameter
    );

    const publishParameter = {
      creation_id: containerId.data.id,
      access_token: process.env.facebookAccessToken,
    };

    const publishedMediaId = await axios.post(
      "https://graph.facebook.com/v17.0/17841460615589377/media_publish",
      publishParameter
    );

    res.status(200).json(publishedMediaId.id);
  } catch (error) {
    res.status(500).json(error);
  }
}
