"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mb-4 border border-red-500/30">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
      <p className="text-gray-400 mb-6 max-w-xs">{message}</p>
      <motion.button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </motion.button>
    </div>
  )
}
