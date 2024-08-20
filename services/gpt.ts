import axios from "axios";

export async function OpenAiGpt(prompt: string) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4096,
        temperature: 0.7,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
      }
    );
    console.log(response.data.choices[0].message.content ?? response);
    return response.data.choices[0].message.content ?? response;
  } catch (error) {}
}
