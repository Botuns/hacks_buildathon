const { tavily } = require("@tavily/core");
// change to iports
// import { tavily } from "@tavily/core";

// Step 1. Instantiating your Tavily client
const tvly = tavily({ apiKey: "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" });

// Step 2. Executing a context search query
const context = tvly.search("What happened during the Burning Man floods?", {});

// Step 3. That's it! You now have a context string that you can feed directly into your RAG Application
// console.log(context);
async function main() {
  const response = await context;
  console.log(response);
}
main();
