"use client"
import React from "react";

const Loading = () => {
    return (
      <div className="h-screen flex flex-col gap-y-[2vh] justify-center items-center bg-[#001428]">
        <div class="spinner"></div>
        <p className="text-[#009ff9] text-lg">Loading your PDF...</p>
  <style>
  {`.spinner {
     width: 56px;
     height: 56px;
     border-radius: 50%;
     background: radial-gradient(farthest-side,#009ff9 94%,#0000) top/9px 9px no-repeat,
            conic-gradient(#0000 30%,#009ff9);
     -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
     animation: spinner-c7wet2 1s infinite linear;
  }
  
  @keyframes spinner-c7wet2 {
     100% {
        transform: rotate(1turn);
     }
  }
  `}
  </style>
      </div>
    )
}
  
export default Loading;