"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, GitFork, Eye, Heart, Share2, ExternalLink } from "lucide-react"
import Image from "next/image"

interface RepoCardProps {
  repo: any
  isActive: boolean
}

export default function RepoCard({ repo, isActive }: RepoCardProps) {
  const [liked, setLiked] = useState(false)

  if (!repo) return null

  // Safely access properties with optional chaining and default values
  const starCount = repo.stargazers_count ? repo.stargazers_count.toLocaleString() : "0"
  const forkCount = repo.forks_count ? repo.forks_count.toLocaleString() : "0"
  const watcherCount = repo.watchers_count ? repo.watchers_count.toLocaleString() : "0"
  const topics = repo.topics || []
  const avatarUrl = repo.owner?.avatar_url || "/placeholder.svg?height=40&width=40"
  const ownerName = repo.owner?.login || "Unknown"
  const repoUrl = repo.html_url || "#"

  const shareRepo = () => {
    if (navigator.share) {
      navigator
        .share({
          title: repo.name,
          text: repo.description || `Check out ${repo.name} on GitHub`,
          url: repoUrl,
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
      .writeText(repoUrl)
      .then(() => {
        alert("Repository link copied to clipboard!")
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
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
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
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-medium pr-1">{starCount}</span>
        </motion.div>
      </div>

      <div className="flex-1 p-5">
        <div className="flex items-center gap-3 mb-4">
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-70" />
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={ownerName}
              width={48}
              height={48}
              className="rounded-full border-2 border-white/20 relative z-10"
            />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {ownerName}
            </h3>
            <p className="text-xs text-gray-400 font-medium">GitHub Repository</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {repo.name}
        </h2>

        <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
          {repo.description || "No description available"}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {topics.slice(0, 3).map((topic: string) => (
            <motion.span
              key={topic}
              className="px-3 py-1 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 text-purple-300 rounded-full text-xs font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {topic}
            </motion.span>
          ))}
        </div>

        <div className="flex justify-between items-center mb-5 bg-black/20 rounded-lg p-3 border border-white/5">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">{starCount}</span>
          </div>

          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">{forkCount}</span>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-gray-300">{watcherCount}</span>
          </div>
        </div>

        <motion.a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)",
            boxShadow: "0 4px 10px rgba(236, 72, 153, 0.3)",
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 6px 15px rgba(236, 72, 153, 0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          <ExternalLink className="w-4 h-4" />
          View on GitHub
        </motion.a>
      </div>

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
          onClick={shareRepo}
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
