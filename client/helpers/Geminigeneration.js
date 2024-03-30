import { GoogleGenerativeAI } from "@google/generative-ai";

export async function Geminigeneration(message,code, geminiAPIKey) {
    const genAI = new GoogleGenerativeAI(geminiAPIKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});  
    const result = await model.generateContent(`i am sending you a react functional component where it is used to give the UI of a PDF file and the JSX uses tailwind so what you need to work is the the JSX part which is wrapped like this:
    <Tailwind>
CODE...
</Tailwind> and the code is:${code} and then the user has given this prompt:${message} so just work on it`);
    const response = await result.response;
    const codeString = response.text();
    return codeString;
}