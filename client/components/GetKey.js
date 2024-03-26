"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function GetKey() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [gpt, setGpt] = useState("");
  const [gemini, setGemini] = useState("");

  return (
    <>
          <button onClick={onOpen} className="text-white relative inline-flex items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500  bg-red-600 hover:bg-red-500 px-5 py-2.5">
          ⚠️ Enter API Key
          </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-xl mb-[-2vh] pt-5">🔑 Enter API Key</ModalHeader>
              <ModalBody>
                <p className="text-gray-500"> 
                Your API Key is stored locally on your browser and never sent anywhere else.
                </p>
                <div className="flex flex-col gap-y-2 mb-3">
                  <div className="flex">
                    <span className="font-medium">OpenAI API Key:</span>
                    <span className="text-blue-500 font-medium">{"(Get the Key Here)"}</span>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <img className="w-[30px] h-[30px]" src="https://miro.medium.com/v2/resize:fit:450/format:webp/1*ek9Jo0-MZgURj00CT6PMSg.jpeg" alt="" />
                    <input type="text"
                      onChange={(e)=>{setGpt(e.target.value)}}
                      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="flex-1 py-[6px] px-[6px] border-gray-300 border-3 rounded outline-blue-400" />
                    <Button color="primary"
                    onClick={()=>{localStorage.setItem("gpt",gpt)}}>
                     Save
      </Button> 
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 mb-5">
                  <div className="flex">
                    <span className="font-medium">Google Gemini API Key:</span>
                    <span className="text-blue-500 font-medium">{"(Get the Key Here)"}</span>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <img className="w-[30px] h-[30px]" src="https://res.cloudinary.com/dxprcmmcz/image/upload/v1711445550/Google_Bard_logo_cpve2e.svg" alt="" />
                    <input type="text"
                      onChange={(e)=>{setGemini(e.target.value)}}
                      placeholder="Alxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="flex-1 py-[6px] px-[6px] border-gray-300 border-3 rounded outline-blue-400" />
                    <Button color="primary"
                    onClick={()=>{localStorage.setItem("gemini",gemini)}}>
                     Save
      </Button> 
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
