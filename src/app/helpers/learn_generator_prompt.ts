export function refined_learn_generator_prompt(
  values: any,
  videoUrls: any,
  imageUrls: any
) {
  return `
    You are tasked with generating an educational MDX content array for a learning module based on the following information:
    
    - **Title**: ${values.title}
    - **Description**: ${values.description}
    - **Understanding Level**: ${values.understandingLevel}
    - **Difficulty Level**: ${values.difficultyLevel}
    
    **Video URLs**: 
    ${JSON.stringify(videoUrls)}
    
    **Image URLs**: 
    ${JSON.stringify(imageUrls)}
    
    Please generate a strict vast amount of MDX content, where each sections in the mdx represents a different section or module of the lesson. Structure the content as follows:
    
    1. **Introduction**: Provide an overview of the topic based on the title and description. Introduce the user to the subject matter.
    
    2. **Sections**: Divide the lesson into several sections. Each section should include:
       - A header that clearly indicates the topic of the section.
       - Explanatory text that is detailed but suited to the understanding level and difficulty level provided.
       - An embedded video (use the provided YouTube URLs) or an image (use the provided image URLs) relevant to the section’s content. 
    
    3. **Conclusion**: Summarize the key points covered in the module. 
    
    Ensure that each section flows logically into the next and that the content is engaging and informative. Format the response in MDX with appropriate headers, images, and embedded videos.
    
    Example MDX structure:
    
    \`\`\`
    # Introduction to ${values.title}
    
    [Brief overview based on the title and description]
    
    ![Image](${"url extracted from concerned img info"})
    
    ## Section 1: [Section Title]
    
    [Detailed explanation relevant to this section]
    
    <iframe width="560" height="315" src="${"url extracted from concerned video info"}" title="Video Title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    
    ## Section 2: [Next Section Title]
    
    [Further detailed explanation]
    
    <iframe width="560" height="315" src="${"url extracted from concerned video info"}" title="Video Title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    
    ## Conclusion
    
    [Summary of the key points]
    \`\`\`
    
    **Note**: Adapt the content to match the user's understanding and difficulty levels. Make sure the MDX content is modular and well-organized, with each section providing value and clarity on the topic.
    
    ### Explanation:
    - **Introduction**: Sets the stage for the lesson.
    - **Sections**: Each section should provide in-depth information with multimedia support.
    - **Conclusion**: Summarizes the learning.
    
    ### Additional Tips:
    - **Content Quality**: Ensure the explanations are clear and appropriate for the specified understanding and difficulty levels.
    - **Modularity**: Structure content so that each section can stand alone but also contributes to the overall lesson.
    
    **Note**: you are to be strict with your output. The output should follow this json structure: 
   {
  title           "The best title for the course"
  contents        String[]----array of mdx content(sections)
  numberOfSections Int
  }.
  you are to generate a vast amount of mdx content for the course, the number of sections should be equal to the number of sections in the course, each section should be unique and informative,be sure to include the videos and images provided in the content and make sure you do not generate anything other than the given and required format. and please remove the '\`\'"\`\`\`json...\`\`\`'\"'\`\' from the output because i would not be able to parse it. just the correct json format please be strict with the rules and also for no reason should you warp the json inside "". just start withthe { and end with the }.
  I repeat, your output should be in this format:  {
      "title": "The best title for the course",
      "contents": [ "Array of MDX content sections" ]----array consists of multiple strings, each string representing a different section of the text. Separate the introduction, each section, and the conclusion into distinct strings.e.g :["section1","section2","...","conclusion"],
      "numberOfSections": Integer
    }
      and Only return the JSON object formatted correctly without any extra text or explanations.
  `;
}
