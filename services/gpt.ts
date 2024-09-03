// import axios from "axios";

// export async function OpenAiGpt(prompt: string) {
//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         max_tokens: 4096,
//         temperature: 0.7,
//         n: 1,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:"Bearer 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",
//         },
//       }
//     );
//     console.log(response.data.choices[0].message.content ?? response);
//     return response.data.choices[0].message.content ?? response;
//   } catch (error) {}
// }

import axios from "axios";
export type CourseContent = {
  title: string;
  contents: string[]; 
  numberOfSections: number;
};

const BASE_URL = "https://golive.gmind.ai/v1"; // New base URL
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MzhmN2VjNTJlNzkzMWU2MzA2ZTUzIiwiZW1haWwiOiJpYW10aGF0anVqdW1hbkBnbWFpbC5jb20ifSwiaWF0IjoxNzIzNjQ3MjU4LCJleHAiOjE3MzE0MjMyNTh9.T1KYhVyhZdvBPlEIR4vVqEEhXnQHlIH-h-Jn9hCc4Ms"; // Replace with your token

export async function OpenAiGpt(prompt: string) {
  try {
    const systemPrompt =
      "You are the most brilliant AI tasked with generating an educational MDX content array for a learning module."; // Replace with actual system prompt if needed
    const messages = { role: "user", content: prompt }; // User prompt message

    const response = await axios.post(
      `${BASE_URL}/knowledge-base`,
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          messages,
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Extract and format the response content
    const AIRESULT = response?.data?.data?.choices[0]?.message;
    const generatedContent = AIRESULT?.content;
    const formattedData = JSON.parse(generatedContent);
    // console.log(formattedData);

    // Check if the response data is valid
    // if (!Array.isArray(formattedData)) {
    //   throw new Error("Invalid data format received from API");
    // }

    return formattedData;
  } catch (error) {
    console.error("Error while fetching AI response:", error);
    return [];
  }
}
