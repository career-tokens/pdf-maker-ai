import { GoogleGenerativeAI } from "@google/generative-ai";

export async function Geminigeneration(message, geminiAPIKey) {
    const genAI = new GoogleGenerativeAI(geminiAPIKey || process.env.NEXT_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});  
    const result = await model.generateContent(message);
    const response = await result.response;
    const codeString = response.text();
    return codeString;
}