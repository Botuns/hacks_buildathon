import { DifficultyLevel } from "@/lib/exam";

// export function refined_learn_generator_prompt(
//   values: any,
//   videoUrls: any,
//   imageUrls: any
// ) {
//   return `
//     You are tasked with generating an educational MDX content array for a learning module based on the following information:

//     - **Title**: ${values.title}
//     - **Description**: ${values.description}
//     - **Understanding Level**: ${values.understandingLevel}
//     - **Difficulty Level**: ${values.difficultyLevel}

//     **Video URLs**:
//     ${JSON.stringify(videoUrls)}

//     **Image URLs**:
//     ${JSON.stringify(imageUrls)}

//     Please generate a strict vast amount of MDX content, where each sections in the mdx represents a different section or module of the lesson. Structure the content as follows:

//     1. **Introduction**: Provide an overview of the topic based on the title and description. Introduce the user to the subject matter.

//     2. **Sections**: Divide the lesson into several sections. Each section should include:
//        - A header that clearly indicates the topic of the section.
//        - Explanatory text that is detailed but suited to the understanding level and difficulty level provided.
//        - An embedded video (use the provided YouTube URLs) or an image (use the provided image URLs) relevant to the section’s content.
//        -Content also (including relevant tables if needed,charts and other graphic element designed in mdx), Interactive Elements (quizzes, exercises, etc.)

//     3. **Conclusion**: Summarize the key points covered in the module.

//     Ensure that each section flows logically into the next and that the content is engaging and informative. Format the response in MDX with appropriate headers, images, and embedded videos.

//     Example MDX structure:

//     \`\`\`
//     # Introduction to ${values.title}

//     [Brief overview based on the title and description]

//     ![Image](${"url extracted from concerned img info"})

//     ## Section 1: [Section Title]

//     [Detailed explanation relevant to this section]

//     <iframe width="560" height="315" src="${"url extracted from concerned video info"}" title="Video Title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

//     ## Section 2: [Next Section Title]

//     [Further detailed explanation]

//     <iframe width="560" height="315" src="${"url extracted from concerned video info"}" title="Video Title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

//     ## Conclusion

//     [Summary of the key points]
//     \`\`\`

//     **Note**: Adapt the content to match the user's understanding and difficulty levels. Make sure the MDX content is modular and well-organized, with each section providing value and clarity on the topic.

//     ### Explanation:
//     - **Introduction**: Sets the stage for the lesson.
//     - **Sections**: Each section should provide in-depth information with multimedia support.
//     - **Conclusion**: Summarizes the learning.

//     ### Additional Tips:
//     - **Content Quality**: Ensure the explanations are clear and appropriate for the specified understanding and difficulty levels.
//     - **Modularity**: Structure content so that each section can stand alone but also contributes to the overall lesson.

//     **Note**: you are to be strict with your output. The output should follow this json structure:
//    {
//   title           "The best title for the course"
//   contents        String[]----array of mdx content(sections)
//   numberOfSections Int
//   }.
//   you are to generate a vast amount of mdx content for the course, the number of sections should be equal to the number of sections in the course, each section should be unique and informative,be sure to include the videos and images provided in the content and make sure you do not generate anything other than the given and required format. and please remove the '\`\'"\`\`\`json...\`\`\`'\"'\`\' from the output because i would not be able to parse it. just the correct json format please be strict with the rules and also for no reason should you warp the json inside "". just start withthe { and end with the }.
//   I repeat, your output should be in this format:  {
//       "title": "The best title for the course",
//       "contents": [ "Array of MDX content sections" ]----array consists of multiple strings, each string representing a different section of the text. Separate the introduction, each section, and the conclusion into distinct strings.e.g :["section1","section2","...","conclusion"],
//       "numberOfSections": Integer
//     }
//       and Only return the JSON object formatted correctly without any extra text or explanations.
//   `;
// }
export function refined_learn_generator_prompt(
  values: any,
  videoUrls: any,
  imageUrls: any
) {
  return `
    You are an expert course creator tasked with generating comprehensive, interactive MDX content for a learning module. Use the following information:
    
    - **Title**: ${values.title}
    - **Description**: ${values.description}
    - **Understanding Level**: ${values.understandingLevel}
    - **Difficulty Level**: ${values.difficultyLevel}
    
    **Video URLs**: 
    ${JSON.stringify(videoUrls)}
    
    **Image URLs**: 
    ${JSON.stringify(imageUrls)}
    
    Generate extensive, well-structured MDX content that incorporates modern educational design principles. Each section should be a rich learning experience with:

    1. **Content Structure Requirements**:
       - Clear hierarchy with properly nested headings (h1, h2, h3)
       - Visual separation between concepts using horizontal rules (---)
       - Code blocks with syntax highlighting where relevant
       - Callouts for important information using > blockquotes
       - Tables for structured data and comparisons
       - Bullet points and numbered lists for step-by-step instructions
    
    2. **Interactive Elements**:
       - Info alerts using :::info blocks
       - Warning alerts using :::warning blocks
       - Tip alerts using :::tip blocks
       - Note alerts using :::note blocks
       - Practice exercises and challenges
       - Knowledge check questions
       - Interactive code examples where applicable
    
    3. **Video Integration**:
       - Detailed introduction for each video explaining what will be covered
       - Key timestamps and highlights from the video content
       - Follow-up questions and discussion points
       - Summary of main takeaways from each video
       - Practical exercises related to video content
    
    4. **Visual Elements**:
       - Relevant images with detailed alt text and captions
       - Diagrams and flowcharts using mermaid syntax
       - Tables for comparing concepts
       - Visual hierarchies for complex topics
       - Icons and emojis for visual engagement
    
    5. **Section Structure**:
       Each section must include:
       - Clear learning objectives
       - Prerequisite knowledge
       - Main content with examples
       - Common pitfalls and how to avoid them
       - Real-world applications
       - Practice exercises
       - Summary of key points
       - Additional resources

    Example MDX structure:

    \`\`\`mdx
    # ${values.title}

    <Alert variant="info">
      [Course overview and learning objectives]
    </Alert>

    --- 

    ## Section 1: [Topic]

    ### Learning Objectives
    - Objective 1
    - Objective 2

    <Alert variant="note">
      Prerequisites for this section
    </Alert>

    ### Video Walkthrough
    <VideoExplanation>
      Title: [Video Title]
      Duration: [Duration]
      Key Topics:
      - Topic 1
      - Topic 2
    </VideoExplanation>

    <iframe width="560" height="315" src="[video_url]" title="Video Title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    ### Key Concepts
    [Detailed explanation with examples]

    <Alert variant="tip">
      Pro Tips and Best Practices
    </Alert>

    ### Interactive Example
    \`\`\`javascript
    // Code example
    \`\`\`

    ### Practice Exercise
    <Exercise>
      [Exercise details]
    </Exercise>

    ### Visual Aid
    <Mermaid>
      [Diagram syntax]
    </Mermaid>

    ### Knowledge Check
    <Quiz>
      [Quiz questions]
    </Quiz>
    \`\`\`

    The output must strictly follow this JSON structure:
    {
      "title": "Comprehensive course title",
      "contents": ["array of detailed MDX content sections"],
      "numberOfSections": Integer
    }

    Requirements:
    1. Each string in the contents array should be a complete, self-contained MDX section
    2. Include all multimedia elements (videos, images) with proper explanations
    3. Maintain consistent formatting and structure across sections
    4. Generate comprehensive content for each section
    5. Use proper MDX syntax for all interactive elements
    6. Return only the JSON object without any markdown fences or additional text
  `;
}

export function generateExamPrompt(
  difficulty: DifficultyLevel,
  className: string,
  description: string,
  numberOfQuestions: number
): string {
  const prompt = `
Generate a structured JSON object for an exam with the following details:

- Difficulty: ${difficulty}
- Class: ${className}
- Description: ${description}
- Number of Questions: ${numberOfQuestions}

The JSON object should follow this structure:

{
  "id": string,
  "title": string,
  "description": string,
  "questions": [
    {
      "id": string,
      "text": string,
      "options": string[],
      "correctOptionIndex": number
    }
  ],
  "timeLimit": number,
  "difficultyLevel": "${difficulty}"
}

Ensure that:
1. The exam title is relevant to the class name.
2. The time limit is appropriate for the difficulty and number of questions (Easy: 1 minute per question, Medium: 1.5 minutes per question, Hard: 2 minutes per question).
3. Each question has a unique ID (e.g., Q1, Q2, etc.).
4. Each question has exactly 4 options.
5. The correctOptionIndex is a valid index (0-4) for the options array.
6. The questions are relevant to the class and difficulty level.

Generate the JSON object without any additional text or explanations,Generate JSON only, with no extra text or explanations, just the structured output.
    Provide sample questions appropriate to the class and difficulty level..
    I repeat for noting again, be strict with your output and make sure you follow the given format and instructions, and please remove the '\`\'"\`\`\`json...\`\`\`'\"'\`\' from the output because i would not be able to parse it. just the correct json format please be strict with the rules and also for no reason should you wrap the json inside "". just start withthe { and end with the }
`;

  return prompt;
}

export function generateSearchResultsPrompt(
  query: string,
  numberOfResults: number = 4
): string {
  const prompt = `
As a professional web researcher, your role is to deepen your understanding of the user's input by conducting further inquiries especially with relevant links and images.Perform an extensive web search for the following query: "${query}"

Generate a structured JSON object containing search results. The JSON object should follow this structure:
{
  "overviewDescription": string,
  "results": [
    {
      "imageUrl": string,
      "descriptionAnswer": string,
      "confidenceLevel": number,
      "externalLink": string
    }
  ]
}

Ensure that:
1. The overviewDescription provides an extensive summary of the search topic, covering key points and general information.
2. The number of results is exactly ${numberOfResults}.
3. Each result contains:
   - A relevant imageUrl (use placeholder if which is copulsory, e.g., "https://example.com/image1.jpg but it ust be antual  image url")
   - A detailed descriptionAnswer that directly addresses the query
   - A confidenceLevel between 0 and 1, indicating the reliability of the information
   - An externalLink to a reputable source for further reading
4. The information is accurate and up-to-date as of your last training data.
5. The results are diverse and cover different aspects of the query when applicable.

Generate the JSON object without any additional text, explanations, or markdown formatting. Start directly with the opening curly brace '{' and end with the closing curly brace '}'. Do not include any text outside of the JSON structure.
`;

  return prompt;
}
