import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export default async function handler(req, res) {
  try {
    const image = "";
    const mp3 = "";

    res.status(200).json({ response: responseFromAi });
  } catch (error) {
    res.status(500).json(error);
  }
}
