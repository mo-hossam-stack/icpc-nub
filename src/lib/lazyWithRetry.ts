import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(() => {
    const retry = (error: any, retries = 1): Promise<{ default: T }> => {
      if (retries <= 0) return Promise.reject(error)
      return new Promise((resolve) => {
        setTimeout(resolve, 300)
      }).then(() =>
        factory().catch((err) => retry(err, retries - 1))
      )
    }
    return factory().catch((error) => retry(error))
  })
}
