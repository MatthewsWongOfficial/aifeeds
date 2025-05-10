import { Github, Sparkles, Search } from "lucide-react"

interface EmptyStateProps {
  type: "github" | "huggingface"
}

export default function EmptyState({ type }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
        {type === "github" ? (
          <Github className="w-8 h-8 text-gray-400" />
        ) : (
          <Sparkles className="w-8 h-8 text-gray-400" />
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">No {type === "github" ? "repositories" : "models"} found</h3>
      <p className="text-gray-400 mb-6 max-w-xs">
        We couldn't find any {type === "github" ? "GitHub repositories" : "Hugging Face models"} matching your criteria.
      </p>
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <Search className="w-4 h-4" />
        <span>Try again later</span>
      </div>
    </div>
  )
}
