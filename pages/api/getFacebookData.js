import axios from "axios";

export default async function handler(req, res) {
  try {

    // Set new access_token to environment
    const LongLivedAccessToken = await axios.get(
      `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&fb_exchange_token=${process.env.facebookAccessToken}`
    );

    process.env.facebookAccessToken = LongLivedAccessToken;

    res.status(200).json("Access token updated");
  } catch (error) {
    res.status(500).json(error);
  }
}
