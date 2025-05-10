import { Suspense } from "react"
import InfiniteScroll from "@/components/infinite-scroll"
import Loading from "@/components/loading"
import { Linkedin } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-950 via-[#0c1120] to-gray-950 text-white">
      <header className="w-full fixed top-0 z-50 flex justify-between items-center p-4 bg-black/50 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          AiFeeds
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>

          <a
            href="https://linkedin.com/in/matthewswong"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
          </a>
        </div>
      </header>

      <div className="w-full pt-16 pb-4">
        <Suspense fallback={<Loading />}>
          <InfiniteScroll />
        </Suspense>
      </div>
    </main>
  )
}
