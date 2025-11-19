"use client";
import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  // Always start with initialValue to match server rendering
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage after hydration (client-side only)
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
    setIsInitialized(true);
  }, [key]);

  // Save to localStorage and update state immediately
  const setItem = useCallback(({ key, value }: { key: string; value: T }) => {
    try {
      setValue(value); // Update state immediately for UI
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, []);

  const getItem = useCallback(
    ({ key, initialValue }: { key: string; initialValue: T }) => {
      try {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
        return initialValue;
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        return initialValue;
      }
    },
    []
  );

  return { value, getItem, setItem, isInitialized };
};
