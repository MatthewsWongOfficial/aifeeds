// GitHub API
export async function fetchGithubRepos(page = 1, perPage = 10) {
  try {
    // Create an array of possible sort options
    const sortOptions = ["stars", "forks", "updated", "help-wanted-issues"]

    // Create an array of possible topic combinations
    const topicCombinations = [
      "topic:artificial-intelligence+topic:machine-learning",
      "topic:deep-learning+topic:neural-networks",
      "topic:nlp+topic:transformers",
      "topic:computer-vision+topic:ai",
      "topic:reinforcement-learning+topic:ai",
      "topic:gpt+topic:llm",
      "topic:stable-diffusion+topic:generative-ai",
      "topic:data-science+topic:ai",
    ]

    // Randomly select a sort option and topic combination
    const randomSort = sortOptions[Math.floor(Math.random() * sortOptions.length)]
    const randomTopics = topicCombinations[Math.floor(Math.random() * topicCombinations.length)]

    // Add a small random offset to the page to get different results
    const pageOffset = Math.floor(Math.random() * 3) // 0, 1, or 2
    const adjustedPage = page + pageOffset

    // Create a timestamp to bust cache
    const timestamp = new Date().getTime()

    const response = await fetch(
      `https://api.github.com/search/repositories?q=${randomTopics}&sort=${randomSort}&order=desc&page=${adjustedPage}&per_page=${perPage}&_=${timestamp}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store", // Don't cache this request
      },
    )

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.")
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error("Invalid response format from GitHub API")
    }

    // Shuffle the results for more variety
    const shuffledItems = shuffleArray([...data.items])

    return shuffledItems || []
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    throw error
  }
}

// Hugging Face API
export async function fetchHuggingFaceModels(page = 1, perPage = 10) {
  try {
    // Create an array of possible sort options
    const sortOptions = ["downloads", "likes", "lastModified"]

    // Randomly select a sort option
    const randomSort = sortOptions[Math.floor(Math.random() * sortOptions.length)]

    // Add a small random offset to the page to get different results
    const pageOffset = Math.floor(Math.random() * 5) // 0 to 4
    const adjustedPage = page + pageOffset

    // Calculate the offset for the API
    const offset = (adjustedPage - 1) * perPage

    // Create a timestamp to bust cache
    const timestamp = new Date().getTime()

    const response = await fetch(
      `https://huggingface.co/api/models?sort=${randomSort}&direction=-1&limit=${perPage}&offset=${offset}&_=${timestamp}`,
      {
        cache: "no-store", // Don't cache this request
      },
    )

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Hugging Face API rate limit exceeded. Please try again later.")
      }
      throw new Error(`Hugging Face API error: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format from Hugging Face API")
    }

    // Shuffle the results for more variety
    const shuffledItems = shuffleArray([...data])

    return shuffledItems || []
  } catch (error) {
    console.error("Error fetching Hugging Face models:", error)
    throw error
  }
}

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
