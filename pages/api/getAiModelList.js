import axios from "axios";

export default async function handler(req, res) {
  const options = {
    method: "GET",
    url: "https://omniinfer.p.rapidapi.com/v2/models",
    params: { type: "checkpoint" },
    headers: {
      "X-RapidAPI-Key": "1ccb934de6msha4ae1d218201d21p14cd9djsn144541d3ed37",
      "X-RapidAPI-Host": "omniinfer.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
}
