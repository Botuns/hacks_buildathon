"use server";

import fs from "fs/promises"; // Use the promise-based version of fs

export async function saveResponseToFile() {
  try {
    // Mocking the response from generateObject
    const response = {
      data: "Sample response from AI",
      timestamp: new Date().toISOString(),
    };

    const jsonData = JSON.stringify(response, null, 2);

    // Define the path where the file will be saved
    const filePath = "./public/response.json";

    // Write the file to the server's filesystem
    await fs.writeFile(filePath, jsonData);

    return { message: "File saved successfully!" };
  } catch (error) {
    console.error("Error writing file:", error);
    return { message: "Failed to save the file." };
  }
}
