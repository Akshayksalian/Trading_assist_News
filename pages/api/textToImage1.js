import axios from "axios";

export default async function handler(req, res) {
  try {
    const textPrompt = req.body.textForImage;

    const options = {
      method: "POST",
      url: "https://ai-image-generator3.p.rapidapi.com/generate",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "1ccb934de6msha4ae1d218201d21p14cd9djsn144541d3ed37",
        "X-RapidAPI-Host": "ai-image-generator3.p.rapidapi.com",
      },
      data: {
        prompt: textPrompt,
        page: 1,
      },
    };

    const responseOfImage = await axios.request(options);
    res
      .status(200)
      .json({ imageUrl: responseOfImage.data.results.variaties[0].urls[0] });
  } catch (error) {
    res.status(500).json(error);
  }
}
