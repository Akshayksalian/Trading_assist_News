import axios from "axios";

export default async function handler(req, res) {
  const options = {
    method: "POST",
    url: "https://omniinfer.p.rapidapi.com/v2/txt2img",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "1ccb934de6msha4ae1d218201d21p14cd9djsn144541d3ed37",
      "X-RapidAPI-Host": "omniinfer.p.rapidapi.com",
    },
    data: {
      negative_prompt:
        "nsfw, watermark, facial distortion, lip deformity, redundant background, extra fingers, Abnormal eyesight, ((multiple faces)), ((Tongue protruding)), ((extra arm)), extra hands, extra fingers, deformity, missing legs, missing toes, missin hand, missin fingers, (painting by bad-artist-anime:0.9), (painting by bad-artist:0.9), watermark, text, error, blurry, jpeg artifacts, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, artist name, (worst quality, low quality:1.4), bad anatomy",
      sampler_name: "Euler a",
      batch_size: 1,
      n_iter: 1,
      steps: 20,
      cfg_scale: 7,
      seed: -1,
      height: 1024,
      width: 768,
      model_name: "meinamix_meinaV9.safetensors",
      prompt:
        "(Studio ghibli), nekopara, highly detailed, modern anime,detailed portrai, vibrant, kyoto animation, hideaki anno, Sakimichan, Stanley Artgerm, Lau Rossdraws, James Jean, Marc Simonetti, elegant highly detailed, digital painting, artstation pixiv cyberpunk mouth sharp focus, japan anime",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
