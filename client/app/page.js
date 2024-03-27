import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Link href="/generation">
      <button
          className="text-white relative inline-flex items-center gap-2 bg-clip-padding rounded-full font-medium border border-transparent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500  bg-blue-600 hover:bg-blue-500 px-5 py-2.5"
      >Get Started
        </button>
        </Link>
    </div>
  )
}

export default page