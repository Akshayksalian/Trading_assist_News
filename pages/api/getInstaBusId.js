import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = `${process.env.facebookUrl}v17.0/me?fields=id,accounts{instagram_business_account}&access_token=${process.env.facebookAccessToken}`;
    const value = await axios.get(url);
    console.log(url);
    res.status(200).json(value.data);
  } catch (error) {
    res.status(500).json(error);
  }
}
