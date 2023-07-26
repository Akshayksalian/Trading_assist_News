import axios from "axios";

export default async function handler(req, res) {
  try {
    const newsData = await axios.get(`https://${req.headers.host}/api/getNewsData`);

    // if (
    //   process.env.lastPublishedValue !== newsData.data.articles[0].publishedAt
    // ) {
      const options = {
        method: "POST",
        url: "https://omniinfer.p.rapidapi.com/v2/txt2img",
        headers: {
          "content-type": "application/json",
          'X-Omni-Key': 'd1dc39f7-a1d3-4441-a4ad-3e0defb6ac6a',
          "X-RapidAPI-Key":
            "1ccb934de6msha4ae1d218201d21p14cd9djsn144541d3ed37",
          "X-RapidAPI-Host": "omniinfer.p.rapidapi.com",
        },
        data: {
          negative_prompt:
            "nsfw, watermark, facial distortion, lip deformity, redundant background, extra fingers, Abnormal eyesight, ((multiple faces)), ((Tongue protruding)), ((extra arm)), extra hands, extra fingers, deformity, missing legs, missing toes, missin hand, missin fingers, (painting by bad-artist-anime:0.9), (painting by bad-artist:0.9), watermark, text, error, blurry, jpeg artifacts, cropped, worst quality, low quality, high quality, jpeg artifacts, signature, watermark, username, artist name, (worst quality, low quality:1.4), bad anatomy",
          sampler_name: "Euler a",
          batch_size: 1,
          n_iter: 1,
          steps: 20,
          cfg_scale: 7,
          seed: -1,
          height: 512,
          width: 512,
          model_name: "meinamix_meinaV9.safetensors",
          prompt: newsData.data.articles[0].description,
        },
      };

      function waitFor(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

      const response = await axios.request(options);

      await waitFor(5000);

      const options1 = {
        method: "GET",
        url: "https://omniinfer.p.rapidapi.com/v2/progress",
        params: {
          task_id: response.data.data.task_id,
        },
        headers: {
          'X-Omni-Key': 'd1dc39f7-a1d3-4441-a4ad-3e0defb6ac6a',
          "X-RapidAPI-Key":
            "1ccb934de6msha4ae1d218201d21p14cd9djsn144541d3ed37",
          "X-RapidAPI-Host": "omniinfer.p.rapidapi.com",
        },
      };

      const response1 = await axios.request(options1);

      process.env.lastPublishedValue = newsData.data.articles[0].publishedAt;

      res.status(200).json({
        response: {
          message:"Success",
          aiImage: response1.data.data.imgs[0],
          newsImage: newsData.data.articles[0].image,
          newsData: newsData.data,
        },
      });
    // } else {
    //   res.status(200).json({ response: "Same data present" });
    // }
  } catch (error) {
    res.status(500).json(error);
  }
}
