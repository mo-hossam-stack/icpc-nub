const preloaded = new Set<string>()

export function preloadDeck(levelId: string, topicId: string) {
  const key = `${levelId}/${topicId}`
  if (preloaded.has(key)) return
  preloaded.add(key)
  // Dynamic import to warm the split chunk without blocking initial bundle
  import('../components/DeckPlayer').catch(() => {
    // Reset on failure so retry can preload again
    preloaded.delete(key)
  })
}
