"use client"

import { useEffect, useState } from "react";
import GetKey from "../../components/GetKey.js";
import ChooseModel from "../../components/ChooseModel.js"
import { Geminigeneration } from "@/helpers/Geminigeneration.js";
import { GPTgeneration } from "@/helpers/GPTgeneration.js";
import Loading from "@/components/LoadingScreen.js";
import { initialcode } from "@/helpers/initialcode.js";
import { Spinner } from "@nextui-org/react";
import { Toaster,toast } from "sonner";
import { UserButton } from "@clerk/nextjs";
import { Editor } from "@monaco-editor/react";
import useEditor from "@/hooks/useEditor.js";

export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [finalCode, setFinalCode] = useState(initialcode);
  const [pdfData, setPdfData] = useState("");
  const [promptResponseLoading, setPromptResponseLoading] = useState(false);
  const handleMount = useEditor(setFinalCode);

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
      console.log(key)
      if (key)
      {console.log("here")
        setFinalCode(await Geminigeneration(prompt,finalCode, key));
        setPromptResponseLoading(false)
      }
      else if (process.env.NEXT_PUBLIC_DEVELOPEMENT_MODE == true)
      {
        setFinalCode(await Geminigeneration(prompt,finalCode, process.env.NEXT_PUBLIC_API_KEY));
        setPromptResponseLoading(false)
      }
      else
      toast.error("API Key Not Found")
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
    <>
      <style>
        {
          `
          .cl-rootBox{
            position:absolute;
            top:15px;
            left:20px;
            scale:1.3;
          }
          `
        }
      </style>
      <UserButton/>
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
          <div className="flex-1 w-full py-4 rounded border-2 border-blue-400 bg-white bg-opacity-5">
          <Editor
            className="flex-1 w-full"
            defaultLanguage="javascript"
              defaultValue={`${finalCode}`}
              onMount={handleMount}
              theme="vs-dark"
              />
        </div>
        <button className="text-white relative inline-flex items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500  bg-blue-600 hover:bg-blue-500 px-5 py-2.5"
            onClick={() => {
              setPdfData("")
              handleSubmit()
            }}>Submit Final Code</button>
      </div>
      <div className="min-h-screen w-full lg:w-[50vw]">
        {!pdfData&&<Loading/>}
        {pdfData&&<object data={pdfData} className="w-full h-screen z-[1000]" type="application/pdf"/>}
      </div>
      </div>
      <Toaster richColors position="top-center" />
      </>
  )
}

//prompt:give teh react functional component to generate the UI of invoice  and use tailwindcss and also wrap teh JSX with Tailwind wrapper imported from "@onedoc/react-print"  and also make the necessary imports like react. DO NOT import anything else from onedoc/react-print. do not use any props give all teh data yourself in the component
