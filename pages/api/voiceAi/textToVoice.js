import axios from "axios";
export default async function handler(req, res) {
  const options = {
    method: "GET",
    url: "https://microsoft-edge-text-to-speech.p.rapidapi.com/TTS/EdgeTTS",
    params: {
      text: "The WBJEE 2023 mock seat allotment result is now available. Candidates can check their result on the official website and download a copy for future reference. The seat allotment result for Round 1 will be released on August 1, 2023.",
      voice_name: "en-US-AriaNeural",
    },
    headers: {
      "X-RapidAPI-Key": "1ccb934de6msha4ae1d218201d21p14cd9djsn144541d3ed37",
      "X-RapidAPI-Host": "microsoft-edge-text-to-speech.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
}
