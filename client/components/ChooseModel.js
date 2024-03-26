"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Checkbox,
} from "@nextui-org/react";

export default function ChooseModel() {
  const [selected, setSelected] = useState(2);

  useEffect(() => {
    if (selected === 1)
      localStorage.setItem("model", "GPT");
    if (selected === 2)
      localStorage.setItem("model", "Gemini");
  }, [selected]);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button className="text-white relative inline-flex items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500  bg-blue-600 hover:bg-blue-500 px-5 py-2.5">
            Choose Model
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="gpt">
            <div className="flex justify-between items-center text-lg">
              <div className="flex gap-x-2">
                <img
                  src="https://miro.medium.com/v2/resize:fit:450/format:webp/1*ek9Jo0-MZgURj00CT6PMSg.jpeg"
                  alt=""
                  className="h-[30px] w-[30px] rounded"
                />
                GPT-4
              </div>
              <Checkbox isSelected={selected === 1} onClick={()=>{setSelected(1)}}/>
            </div>
          </DropdownItem>
          <DropdownItem key="gemini">
            <div className="flex justify-between items-center text-lg">
              <div className="flex gap-x-2">
                <img
                  src="https://res.cloudinary.com/dxprcmmcz/image/upload/v1711445550/Google_Bard_logo_cpve2e.svg"
                  alt=""
                  className="h-[30px] w-[30px] rounded"
                />
                Gemini Pro
              </div>
              <Checkbox isSelected={selected===2} onClick={()=>{setSelected(2)}}/>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
