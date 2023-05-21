'use client';

import { useState } from "react"

const useLocalStorage = <T>(
  key: string,
  initialValue: any
): [T, (value: T | ((value: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? item : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((value: T) => T)) => {
    try {
      const valueToStore: T =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
