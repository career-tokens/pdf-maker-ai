"use client"

import { useEffect, useState } from "react";
import GetKey from "../components/GetKey.js";
import ChooseModel from "../components/ChooseModel.js"
import { Geminigeneration } from "@/helpers/Geminigeneration.js";
import { GPTgeneration } from "@/helpers/GPTgeneration.js";
import Loading from "@/components/LoadingScreen.js";
import { ToastContainer, toast } from "react-toastify";
import { initialcode } from "@/helpers/initialcode.js";
import { Spinner } from "@nextui-org/react";

export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [finalCode, setFinalCode] = useState(initialcode);
  const [pdfData, setPdfData] = useState("");
  const [promptResponseLoading, setPromptResponseLoading] = useState(false);

  const handleSendPrompt = async () => {
    if (localStorage.getItem("model") === "gpt")
    {
      let key = localStorage.getItem("gpt")
      if (key)
      {
        setFinalCode(GPTgeneration(prompt, key))
        setPromptResponseLoading(false)
      }
      else
        toast.error("API Key Not Found")
    }
    else
    {
      let key = localStorage.getItem("gemini");
      // if (key)
      // {console.log("here")
      //   setFinalCode(await Geminigeneration(prompt, key));
      //   setPromptResponseLoading(false)
      // }
      // else if (process.env.NEXT_PUBLIC_DEVELOPEMENT_MODE == true)
      // {
        setFinalCode(await Geminigeneration(prompt, process.env.NEXT_PUBLIC_API_KEY));
        setPromptResponseLoading(false)
    //   }
    //   else
    //   toast.error("API Key Not Found")
    }
  }

  const handleSubmit = async () => {
    console.log(finalCode)
    const res= await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_BACKEND}/api/playground`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code:finalCode}),
    })
    const resjson = await res.json();
    const html = resjson.html;
    const pdfdata= await fetch("/api/getPDF", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({html}),
    })
    const blob = await pdfdata.blob();
    setPdfData(URL.createObjectURL(blob));
  }

  useEffect(()=>{handleSubmit()}, []);

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
        <div className="flex justify-center items-center gap-x-3">
        <button
          className="text-white relative inline-flex items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500  bg-blue-600 hover:bg-blue-500 px-5 py-2.5"
            onClick={
              () => {
                setPromptResponseLoading(true)
              handleSendPrompt()
              }
            }>Send Prompt</button>
          {promptResponseLoading&&<Spinner/>}
        </div>
        <p className="text-white text-lg">Make sure to have a valid React component here with valid imports.</p>
        <textarea
          className="rounded flex-1 w-full z-[2] p-2"
          value={`${finalCode}`}
          onChange={(e) => { setFinalCode(e.target.value) }} />
        <button className="text-white relative inline-flex items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500  bg-blue-600 hover:bg-blue-500 px-5 py-2.5"
          onClick={handleSubmit}>Submit Final Code</button>
      </div>
      <div className="min-h-screen w-full lg:w-[50vw]">
        {!pdfData&&<Loading/>}
        {pdfData&&<object data={pdfData} className="w-full h-screen z-[1000]" type="application/pdf"/>}
      </div>
      </div>

  )
}
