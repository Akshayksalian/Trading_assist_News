import Bard, { askAI } from "bard-ai";

export default async function handler(req, res) {
  try {
    await Bard.init(process.env.BARD_Cookie);
    const responseFromAi = await askAI("Sumarize this paragraph limit with 30 words and enclose them inside square brackets 'With a few Bills being passed in both Lok Sabha and Rajya Sabha, the monsoon session has largely seen a logjam so far amid the Opposition's demand for a discussion on the Manipur issue followed by an elaborate statement by Prime Minister Narendra Modi on the matter. The no-confidence motion moved by the INDIA bloc is also seen as a strategic step to compel the PM Modi-led government for a discussion. Thursday saw a high-decibel unrest in the parliament, especially in the upper House, which also followed with a walk out by the Opposition MPs. As earlier, both the Houses saw a series of sloganeering from the Opposition benches along with display of placards, driving both Lok Sabha Speaker Om Birla and Rajya Sabha Chairman Jagdeep Dhankhar to remind the members about the House decorum. As a sign of protest, the INDIA bloc-led Opposition alliance entered the parliament wearing black clothes on Thursday. They had also boycotted a meeting of the Business Advisory Committee (BAC) of the Rajya Sabha ahead of the beginning of House proceedings. Meanwhile, a slew of Bills were also passed in both Houses yesterday amid the unrest. The Cinematograph (Amendment) Bill, 2023, was passed in the upper House in the absence of the Opposition. In Lok Sabha, Jan Vishwas (Amendment and Provision) Bill, 2023, was passed, as per the Joint Committee.'");

    res.status(200).json({response : responseFromAi});
  } catch (error) {
    res.status(500).json(error);
  }
}
