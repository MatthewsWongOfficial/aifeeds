"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-40 w-full gap-4">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500 border-t-transparent border-opacity-80"></div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-pink-500 border-r-purple-500 border-b-pink-500 border-l-purple-500 border-b-transparent border-opacity-80"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        ></motion.div>
      </motion.div>
      <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
    </div>
  )
}
