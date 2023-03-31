// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only Post Method is allowed" });
  } else {
    try {
      const { body } = req;
      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      };
      //could be used if u want to specify model
      // const data = {
      //   model: "gpt-3.5-turbo",
      //   messages: [{ role: "user", content: body }],
      // };
      const response = await axios.post(url, body, { headers: headers });
      res.status(200).json(response.data);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
