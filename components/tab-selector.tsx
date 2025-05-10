"use client"

import { motion } from "framer-motion"
import { Github, Sparkles } from "lucide-react"

interface TabSelectorProps {
  activeType: "github" | "huggingface"
  onTabChange: (type: "github" | "huggingface") => void
}

export default function TabSelector({ activeType, onTabChange }: TabSelectorProps) {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 flex justify-center p-3 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="flex rounded-full bg-black/30 p-1 border border-white/10">
        <motion.button
          onClick={() => onTabChange("github")}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {activeType === "github" && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/90 to-pink-600/90"
              layoutId="activeTab"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <Github className="w-4 h-4 relative z-10" />
          <span className="relative z-10">AI Repositories</span>
        </motion.button>

        <motion.button
          onClick={() => onTabChange("huggingface")}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {activeType === "huggingface" && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600/90 to-purple-600/90"
              layoutId="activeTab"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <Sparkles className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Newest AI Models</span>
        </motion.button>
      </div>
    </div>
  )
}
