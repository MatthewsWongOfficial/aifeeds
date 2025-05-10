"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Heart, Share2, Tag, Zap, Award, ExternalLink, Hash } from "lucide-react"

interface ModelCardProps {
  model: any
  isActive: boolean
}

export default function ModelCard({ model, isActive }: ModelCardProps) {
  const [liked, setLiked] = useState(false)

  if (!model) return null

  // Safely access properties with optional chaining and default values
  const downloads = model.downloads ? model.downloads.toLocaleString() : "0"
  const likes = model.likes ? model.likes.toLocaleString() : "0"
  const tags = model.tags || []

  // The model ID could be in different formats
  const modelId = model.modelId || model.id || "Unknown Model"

  // Extract the author from the model ID (usually in format "author/model-name")
  const authorFromId = typeof modelId === "string" && modelId.includes("/") ? modelId.split("/")[0] : null

  // Use the explicit author field if available, otherwise extract from ID
  const author = model.author || authorFromId || "Unknown"

  // Get the model name (last part of the ID)
  const modelName = typeof modelId === "string" && modelId.includes("/") ? modelId.split("/").pop() : modelId

  const pipelineTag = model.pipeline_tag || "Unknown"
  const modelUrl = `https://huggingface.co/${modelId}`
  const description = model.description || null

  const shareModel = () => {
    if (navigator.share) {
      navigator
        .share({
          title: modelId,
          text: `Check out ${modelId} on Hugging Face`,
          url: modelUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
          // Fallback to clipboard
          copyToClipboard()
        })
    } else {
      // Fallback to clipboard
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(modelUrl)
      .then(() => {
        alert("Model link copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy:", err)
      })
  }

  return (
    <motion.div
      className="relative w-full h-auto max-w-md mx-auto rounded-xl overflow-hidden flex flex-col"
      animate={{ scale: isActive ? 1 : 0.98, opacity: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "linear-gradient(145deg, #1a1a2e 0%, #0f3460 100%)",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <motion.div
          className="bg-black/30 backdrop-blur-md p-1.5 rounded-full flex items-center gap-1.5 border border-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-medium pr-1">{downloads}</span>
        </motion.div>
      </div>

      <div className="flex-1 p-5">
        {/* Header with author info */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-sm opacity-70" />
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold relative z-10 border-2 border-white/20">
              {author.substring(0, 2).toUpperCase()}
            </div>
          </motion.div>
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {author}
            </h3>
            <div className="flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-pink-400" />
              <span className="text-xs text-gray-400">{pipelineTag}</span>
            </div>
          </div>
        </div>

        {/* Model name */}
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          {modelName}
        </h2>

        {/* Model ID */}
        <div className="flex items-center gap-2 mb-4 bg-black/20 rounded-lg p-2.5 border border-white/5">
          <Hash className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300 font-mono overflow-hidden text-ellipsis">{modelId}</span>
        </div>

        {/* Description if available */}
        {description && (
          <p className="text-gray-300 mb-4 text-sm leading-relaxed bg-black/10 p-3 rounded-lg border border-white/5">
            {description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag: string, index: number) => (
            <motion.span
              key={`${tag}-${index}`}
              className="px-3 py-1 bg-gradient-to-r from-pink-900/40 to-purple-900/40 border border-pink-500/20 text-pink-300 rounded-full text-xs font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2 bg-black/20 rounded-lg p-2.5 border border-white/5">
            <div className="p-1.5 rounded-full bg-pink-900/30">
              <Zap className="w-4 h-4 text-pink-400" />
            </div>
            <span className="text-sm text-gray-300">{likes} likes</span>
          </div>

          <div className="flex items-center gap-2 bg-black/20 rounded-lg p-2.5 border border-white/5">
            <div className="p-1.5 rounded-full bg-purple-900/30">
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-sm text-gray-300">{downloads} downloads</span>
          </div>
        </div>

        {/* Action button */}
        <motion.a
          href={modelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
            boxShadow: "0 4px 10px rgba(236, 72, 153, 0.3)",
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 6px 15px rgba(236, 72, 153, 0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          <ExternalLink className="w-4 h-4" />
          View on Hugging Face
        </motion.a>
      </div>

      {/* Footer actions */}
      <div className="p-4 border-t border-gray-800/50 backdrop-blur-md bg-black/20 flex justify-between items-center">
        <motion.button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart
            className={`w-5 h-5 ${liked ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            fill={liked ? "currentColor" : "none"}
          />
          <span className="text-sm">{liked ? "Liked" : "Like"}</span>
        </motion.button>

        <motion.button
          onClick={shareModel}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-5 h-5 text-gray-400" />
          <span className="text-sm">Share</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
