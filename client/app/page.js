"use client"
import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

const page = () => {
  return (
    <>
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 200 }}
        whileInView={{ opacity: 1, y: 100 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <p className="">Welcome to Prompt2PDF</p>
        <p className="text-[#bd3dd0] text-xl tracking-wide mt-[20px]">Your AI Companion to generate code and convert them to PDFs !</p>
        <p>      <Link href="/generation">
      <button
          className="mt-[20px] text-white dark:text-white relative inline-flex text-lg items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500  bg-blue-600 hover:bg-blue-500 px-5 py-2.5"
      >Get Started
        </button>
        </Link>
        </p>
      </motion.h1>
      </LampContainer>
      <div className="absolute bottom-[10vh] ml-auto mr-auto left-0 right-0 text-2xl">
      <p className="text-[#020617] text-center">In case you are seeing this make sure to disable any dark mode extension</p>
      </div>
      </>
  )
}

export default page