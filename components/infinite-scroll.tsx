"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence } from "framer-motion"
import { fetchGithubRepos, fetchHuggingFaceModels } from "@/lib/api"
import RepoCard from "./repo-card"
import ModelCard from "./model-card"
import Loading from "./loading"
import EmptyState from "./empty-state"
import ErrorState from "./error-state"
import TabSelector from "./tab-selector"
import { RefreshCw } from "lucide-react"

type ContentType = "github" | "huggingface"

export default function InfiniteScroll() {
  const [items, setItems] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [activeType, setActiveType] = useState<ContentType>("github")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0) // Used to force a refresh

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)

    try {
      let newItems
      if (activeType === "github") {
        newItems = await fetchGithubRepos(page)
      } else {
        newItems = await fetchHuggingFaceModels(page)
      }

      if (!newItems || newItems.length === 0) {
        setHasMore(false)
      } else {
        // Add a unique key for each item if it doesn't have an id
        const itemsWithKeys = newItems.map((item: any, index: number) => {
          if (!item.id) {
            return { ...item, id: `${activeType}-${page}-${index}-${refreshKey}` }
          }
          return item
        })

        setItems((prev) => [...prev, ...itemsWithKeys])
        setPage((prev) => prev + 1)
      }
    } catch (error) {
      console.error(`Error loading ${activeType} items:`, error)
      setError(`Failed to load ${activeType === "github" ? "repositories" : "models"}. Please try again later.`)
      setHasMore(false)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [page, loading, hasMore, activeType, refreshKey])

  useEffect(() => {
    // Initial load
    setItems([])
    setPage(1)
    setHasMore(true)
    setInitialLoading(true)
    setError(null)
    loadMoreItems()
  }, [activeType, refreshKey])

  useEffect(() => {
    if (inView && !initialLoading) {
      loadMoreItems()
    }
  }, [inView, loadMoreItems, initialLoading])

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const container = e.currentTarget
      const scrollPosition = container.scrollTop
      const cardHeight = container.clientHeight
      const index = Math.round(scrollPosition / cardHeight)

      if (index !== currentIndex && index < items.length) {
        setCurrentIndex(index)
      }
    },
    [currentIndex, items.length],
  )

  const switchContentType = (type: ContentType) => {
    if (type !== activeType) {
      setActiveType(type)
    }
  }

  const refreshContent = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div ref={containerRef} className="h-[calc(100vh-4rem)] overflow-y-auto" onScroll={handleScroll}>
      <TabSelector activeType={activeType} onTabChange={switchContentType} />

      <div className="pt-16 pb-10 px-4">
        <div className="flex justify-end mb-4">
          <motion.button
            onClick={refreshContent}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={initialLoading || loading}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </motion.button>
        </div>

        {initialLoading ? (
          <Loading />
        ) : error ? (
          <ErrorState message={error} onRetry={loadMoreItems} />
        ) : items.length === 0 && !loading ? (
          <EmptyState type={activeType} />
        ) : (
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id || `${activeType}-${index}-${refreshKey}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: currentIndex === index ? 1 : 0.98,
                }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full mb-6 flex items-center justify-center"
              >
                {activeType === "github" ? (
                  <RepoCard repo={item} isActive={currentIndex === index} />
                ) : (
                  <ModelCard model={item} isActive={currentIndex === index} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {loading && !initialLoading && <Loading />}

        <div ref={ref} className="h-20" />

        {!hasMore && items.length > 0 && !error && (
          <div className="text-center py-6 text-gray-400 font-medium text-sm">
            You've reached the end.{" "}
            <button onClick={refreshContent} className="text-purple-400 hover:underline">
              Refresh for more
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
