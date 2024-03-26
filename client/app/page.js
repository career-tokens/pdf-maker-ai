"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import GetKey from "../components/GetKey.js";
import ChooseModel from "../components/ChooseModel.js"

export default function Home() {

  const [prompt,setPrompt]=useState("")
  const [finalCode, setFinalCode] = useState("")
  const [pdfData,setPdfData]=useState("")

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);

  const handleSendPrompt =async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const codeString = response.text();
    setFinalCode(codeString)
  }
  const handleSubmit = async () => {
    console.log(finalCode)
    const res= await fetch("http://localhost:3001/api/playground", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code:finalCode}),
    })
    const resjson = await res.json();
    const html = resjson.html;
    const pdfdata= await fetch("http://localhost:3000/api/getPDF", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({html}),
    })
    const blob = await pdfdata.blob();
    setPdfData(URL.createObjectURL(blob));
  }
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center">
      <div className="generate-and-show-code p-4 h-screen gap-y-3 w-full lg:w-[50vw] flex flex-col items-center justify-center">
        <div className="w-full flex gap-x-4 justify-center">
          <ChooseModel />
          <GetKey/>
        </div>
        <input
          className="bg-[#374151] w-full rounded-3xl px-4 py-3 text-lg text-white"
          placeholder="Enter a prompt here to generate the UI of a PDF"
          type="text"
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value) }} />
        <button
          className="text-white relative inline-flex items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500  bg-blue-600 hover:bg-blue-500 px-5 py-2.5"
          onClick={handleSendPrompt}>Send Prompt</button>
        <textarea
          className="rounded flex-1 w-full z-[2]"
          value={`${finalCode}`}
          onChange={(e) => { setFinalCode(e.target.value) }} />
        <button className="text-white relative inline-flex items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500  bg-blue-600 hover:bg-blue-500 px-5 py-2.5"
          onClick={handleSubmit}>Submit Final Code</button>
      </div>
      <div className="min-h-screen w-full lg:w-[50vw]">
        {pdfData&&<object data={pdfData} className="w-full h-screen" type="application/pdf"/>}
      </div>
    </div>
  )
}
