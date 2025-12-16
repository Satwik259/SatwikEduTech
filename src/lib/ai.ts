import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateFeedback(submissionText: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an education assistant.
Give constructive, short feedback on the following student submission.
Highlight strengths and suggest improvements.

Submission:
${submissionText}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
