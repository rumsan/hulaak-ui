import { useEffect, useState } from 'react';

// Generic type T allows us to specify the type of the stored value
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store the value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue; // Return initialValue for SSR
    }
    try {
      // Get from localStorage by key
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return the initial value
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect to listen to changes in stored value and update localStorage
  useEffect(() => {
    try {
      // Store the value in localStorage as a JSON string
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
